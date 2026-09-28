import path from 'node:path';
import fs from 'node:fs';

// Try loading native node:sqlite DatabaseSync (Node 22+)
// Fallback or typed wrapper
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DatabaseSync } = require('node:sqlite');

const dbPath = path.resolve(__dirname, '..', 'vyapaar_sarthi.db');

export interface UserRecord {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  password_hash: string;
  created_at: string;
}

export interface PasswordResetTokenRecord {
  id: number;
  user_id: number;
  token: string;
  expires_at: string;
  used: number;
}

export interface OtpVerificationRecord {
  id: number;
  phone: string;
  otp: string;
  expires_at: string;
  verified: number;
}

export const db = new DatabaseSync(dbPath);

// Initialize Tables
export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      token TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      used INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS otp_verifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT NOT NULL,
      otp TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      verified INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS login_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      identifier TEXT NOT NULL,
      attempted_at INTEGER NOT NULL
    );
  `);
}

initDb();
