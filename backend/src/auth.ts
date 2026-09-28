import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { db, UserRecord, PasswordResetTokenRecord, OtpVerificationRecord } from './db.js';
import {
  SignupSchema,
  LoginSchema,
  SendOtpSchema,
  VerifyOtpSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  User
} from './types.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'vyapaar-sarthi-dev-secret-key-2026-sih';
const COOKIE_NAME = 'auth_token';
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 5;

// Helper: Check rate limiting
function checkRateLimit(identifier: string): boolean {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  const countRow = db.prepare(`
    SELECT COUNT(*) as count FROM login_attempts
    WHERE identifier = ? AND attempted_at > ?
  `).get(identifier.toLowerCase(), cutoff) as { count: number } | undefined;

  return (countRow?.count || 0) >= MAX_FAILED_ATTEMPTS;
}

// Helper: Record failed attempt
function recordFailedAttempt(identifier: string): void {
  db.prepare(`
    INSERT INTO login_attempts (identifier, attempted_at)
    VALUES (?, ?)
  `).run(identifier.toLowerCase(), Date.now());
}

// Helper: Clear failed attempts on successful login
function clearFailedAttempts(identifier: string): void {
  db.prepare(`
    DELETE FROM login_attempts WHERE identifier = ?
  `).run(identifier.toLowerCase());
}

// 1. Send OTP (Simulated SMS verification for v1)
router.post('/send-otp', (req: Request, res: Response) => {
  const parseResult = SendOtpSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors[0]?.message || 'Invalid input' });
  }

  const { phone } = parseResult.data;

  // Check if phone is already registered
  const existingUser = db.prepare('SELECT id FROM users WHERE phone = ?').get(phone);
  if (existingUser) {
    return res.status(409).json({ error: 'An account with this number already exists. Try logging in instead.' });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min

  db.prepare(`
    INSERT INTO otp_verifications (phone, otp, expires_at, verified)
    VALUES (?, ?, ?, 0)
  `).run(phone, otp, expiresAt);

  console.log(`[SIMULATED SMS GATEWAY] Generated OTP for ${phone}: ${otp}`);

  return res.json({
    success: true,
    message: `OTP sent successfully to +91 ${phone}`,
    simulatedOtp: otp // Provided so tester / user can enter or autofill easily
  });
});

// 2. Verify OTP
router.post('/verify-otp', (req: Request, res: Response) => {
  const parseResult = VerifyOtpSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors[0]?.message || 'Invalid input' });
  }

  const { phone, otp } = parseResult.data;

  const record = db.prepare(`
    SELECT * FROM otp_verifications
    WHERE phone = ? AND otp = ? AND verified = 0
    ORDER BY id DESC LIMIT 1
  `).get(phone, otp) as OtpVerificationRecord | undefined;

  if (!record) {
    return res.status(400).json({ error: 'Invalid or expired OTP. Please check the code or request a new one.' });
  }

  if (new Date(record.expires_at) < new Date()) {
    return res.status(400).json({ error: 'This OTP has expired. Please request a new one.' });
  }

  db.prepare('UPDATE otp_verifications SET verified = 1 WHERE id = ?').run(record.id);

  return res.json({
    success: true,
    message: 'Phone number verified successfully'
  });
});

// 3. Signup
router.post('/signup', async (req: Request, res: Response) => {
  const parseResult = SignupSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors[0]?.message || 'Invalid input' });
  }

  const { name, phone, email, password, otp } = parseResult.data;
  const normalizedEmail = email && email.trim() !== '' ? email.trim().toLowerCase() : null;

  // Check duplicate phone
  const existingPhone = db.prepare('SELECT id FROM users WHERE phone = ?').get(phone);
  if (existingPhone) {
    return res.status(409).json({ error: 'An account with this number already exists. Try logging in instead.' });
  }

  // Check duplicate email if supplied
  if (normalizedEmail) {
    const existingEmail = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
    if (existingEmail) {
      return res.status(409).json({ error: 'An account with this email already exists. Try logging in instead.' });
    }
  }

  // Check OTP if provided or required
  if (otp) {
    const otpRec = db.prepare(`
      SELECT * FROM otp_verifications
      WHERE phone = ? AND (otp = ? OR verified = 1)
      ORDER BY id DESC LIMIT 1
    `).get(phone, otp) as OtpVerificationRecord | undefined;

    if (!otpRec) {
      return res.status(400).json({ error: 'Please verify your phone number with the OTP first.' });
    }
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Insert user
  const result = db.prepare(`
    INSERT INTO users (name, phone, email, password_hash)
    VALUES (?, ?, ?, ?)
  `).run(name, phone, normalizedEmail, passwordHash);

  const userId = Number(result.lastInsertRowid);
  const user: User = {
    id: userId,
    name,
    phone,
    email: normalizedEmail || undefined
  };

  // Issue JWT (7-day validity)
  const token = jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: '7d' });

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.status(201).json({ user });
});

// 4. Login
router.post('/login', async (req: Request, res: Response) => {
  const parseResult = LoginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors[0]?.message || 'Invalid input' });
  }

  const { identifier, password } = parseResult.data;
  const cleanId = identifier.trim().toLowerCase();

  // Rate Limiting check
  if (checkRateLimit(cleanId)) {
    return res.status(429).json({ error: 'Too many attempts. Try again in a few minutes.' });
  }

  // Find user by phone OR email
  const userRow = db.prepare(`
    SELECT * FROM users
    WHERE phone = ? OR LOWER(email) = ?
  `).get(cleanId, cleanId) as UserRecord | undefined;

  if (!userRow) {
    recordFailedAttempt(cleanId);
    return res.status(401).json({ error: 'Phone number/email or password is incorrect' });
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, userRow.password_hash);
  if (!isMatch) {
    recordFailedAttempt(cleanId);
    return res.status(401).json({ error: 'Phone number/email or password is incorrect' });
  }

  // Clear failed attempts
  clearFailedAttempts(cleanId);

  const user: User = {
    id: userRow.id,
    name: userRow.name,
    phone: userRow.phone,
    email: userRow.email || undefined
  };

  // Issue JWT (7-day validity)
  const token = jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: '7d' });

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.json({ user });
});

// 5. Logout
router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  return res.json({ success: true });
});

// 6. Get Current User (Session check)
router.get('/me', (req: Request, res: Response) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ error: 'Your session has expired. Please log in again.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; phone: string };
    const userRow = db.prepare('SELECT id, name, phone, email FROM users WHERE id = ?').get(decoded.id) as {
      id: number;
      name: string;
      phone: string;
      email: string | null;
    } | undefined;

    if (!userRow) {
      return res.status(401).json({ error: 'Your session has expired. Please log in again.' });
    }

    const user: User = {
      id: userRow.id,
      name: userRow.name,
      phone: userRow.phone,
      email: userRow.email || undefined
    };

    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ error: 'Your session has expired. Please log in again.' });
  }
});

// 7. Forgot Password
router.post('/forgot-password', (req: Request, res: Response) => {
  const parseResult = ForgotPasswordSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors[0]?.message || 'Invalid input' });
  }

  const { identifier } = parseResult.data;
  const cleanId = identifier.trim().toLowerCase();

  const userRow = db.prepare(`
    SELECT * FROM users
    WHERE phone = ? OR LOWER(email) = ?
  `).get(cleanId, cleanId) as UserRecord | undefined;

  // Always return success: true to avoid leaking account existence (PRD Section 8 & 13)
  if (!userRow) {
    return res.json({
      success: true,
      message: 'If an account exists with this credential, password reset instructions have been generated.'
    });
  }

  // Phone-only account notice
  if (!userRow.email) {
    return res.json({
      success: true,
      isPhoneOnly: true,
      message: 'Password reset via SMS is coming soon. Please contact support.'
    });
  }

  // User has email: generate 30-minute token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  db.prepare(`
    INSERT INTO password_reset_tokens (user_id, token, expires_at, used)
    VALUES (?, ?, ?, 0)
  `).run(userRow.id, token, expiresAt);

  console.log(`[PASSWORD RESET LINK] Reset token for ${userRow.email}: /reset-password?token=${token}`);

  return res.json({
    success: true,
    message: 'Password reset instructions have been sent to your registered email.',
    simulatedToken: token, // Provided for immediate in-browser testing
    resetLink: `/reset-password?token=${token}`
  });
});

// 8. Reset Password
router.post('/reset-password', async (req: Request, res: Response) => {
  const parseResult = ResetPasswordSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors[0]?.message || 'Invalid input' });
  }

  const { token, newPassword } = parseResult.data;

  const tokenRow = db.prepare(`
    SELECT * FROM password_reset_tokens
    WHERE token = ? AND used = 0
  `).get(token) as PasswordResetTokenRecord | undefined;

  if (!tokenRow) {
    return res.status(400).json({ error: 'This reset token is invalid or has already been used.' });
  }

  if (new Date(tokenRow.expires_at) < new Date()) {
    return res.status(400).json({ error: 'This password reset link has expired (validity: 30 minutes). Please request a new one.' });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(newPassword, salt);

  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, tokenRow.user_id);
  db.prepare('UPDATE password_reset_tokens SET used = 1 WHERE id = ?').run(tokenRow.id);

  return res.json({
    success: true,
    message: 'Your password has been reset successfully. You can now log in.'
  });
});

export default router;
