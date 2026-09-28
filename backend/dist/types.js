"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.ForgotPasswordSchema = exports.VerifyOtpSchema = exports.SendOtpSchema = exports.LoginSchema = exports.SignupSchema = exports.passwordRegex = exports.phoneRegex = void 0;
const zod_1 = require("zod");
exports.phoneRegex = /^[6-9]\d{9}$/;
exports.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
exports.SignupSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, { message: 'Full name must be at least 2 characters' }),
    phone: zod_1.z.string().trim().regex(exports.phoneRegex, { message: 'Enter a valid 10-digit Indian mobile number' }),
    email: zod_1.z.string().trim().email({ message: 'Enter a valid email address' }).optional().or(zod_1.z.literal('')),
    password: zod_1.z.string().regex(exports.passwordRegex, { message: 'Password must be at least 8 characters with at least 1 letter and 1 number' }),
    otp: zod_1.z.string().length(6, { message: 'OTP must be 6 digits' }).optional()
});
exports.LoginSchema = zod_1.z.object({
    identifier: zod_1.z.string().trim().min(3, { message: 'Please enter your phone number or email' }),
    password: zod_1.z.string().min(1, { message: 'Password is required' })
});
exports.SendOtpSchema = zod_1.z.object({
    phone: zod_1.z.string().trim().regex(exports.phoneRegex, { message: 'Enter a valid 10-digit Indian mobile number' })
});
exports.VerifyOtpSchema = zod_1.z.object({
    phone: zod_1.z.string().trim().regex(exports.phoneRegex, { message: 'Enter a valid 10-digit Indian mobile number' }),
    otp: zod_1.z.string().trim().length(6, { message: 'Enter a valid 6-digit OTP' })
});
exports.ForgotPasswordSchema = zod_1.z.object({
    identifier: zod_1.z.string().trim().min(3, { message: 'Please enter your registered phone number or email' })
});
exports.ResetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, { message: 'Reset token is required' }),
    newPassword: zod_1.z.string().regex(exports.passwordRegex, { message: 'Password must be at least 8 characters with at least 1 letter and 1 number' })
});
