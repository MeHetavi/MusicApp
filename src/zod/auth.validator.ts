import { z } from 'zod';

export const SigninSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Please enter a valid email address'),

    password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long'),

    login_type: z.enum(['email', 'social'], {
        required_error: 'Login type is required',
        invalid_type_error: 'Login type must be either "email" or "social"',
    }),
    is_singer: z.string(),
});

export const verifyOtpSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Please enter a valid email address'),
    otp: z
        .string({ required_error: 'OTP is required' })
});

export const resendOtpSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Please enter a valid email address'),
});

export const forgotPasswordSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password must be at least 6 characters long'),
});