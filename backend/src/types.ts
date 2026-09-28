import { z } from 'zod';

export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

export const phoneRegex = /^[6-9]\d{9}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const SignupSchema = z.object({
  name: z.string().trim().min(2, { message: 'Full name must be at least 2 characters' }),
  phone: z.string().trim().regex(phoneRegex, { message: 'Enter a valid 10-digit Indian mobile number' }),
  email: z.string().trim().email({ message: 'Enter a valid email address' }).optional().or(z.literal('')),
  password: z.string().regex(passwordRegex, { message: 'Password must be at least 8 characters with at least 1 letter and 1 number' }),
  otp: z.string().length(6, { message: 'OTP must be 6 digits' }).optional()
});

export type SignupInput = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  identifier: z.string().trim().min(3, { message: 'Please enter your phone number or email' }),
  password: z.string().min(1, { message: 'Password is required' })
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const SendOtpSchema = z.object({
  phone: z.string().trim().regex(phoneRegex, { message: 'Enter a valid 10-digit Indian mobile number' })
});

export const VerifyOtpSchema = z.object({
  phone: z.string().trim().regex(phoneRegex, { message: 'Enter a valid 10-digit Indian mobile number' }),
  otp: z.string().trim().length(6, { message: 'Enter a valid 6-digit OTP' })
});

export const ForgotPasswordSchema = z.object({
  identifier: z.string().trim().min(3, { message: 'Please enter your registered phone number or email' })
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, { message: 'Reset token is required' }),
  newPassword: z.string().regex(passwordRegex, { message: 'Password must be at least 8 characters with at least 1 letter and 1 number' })
});
