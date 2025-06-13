import express from 'express';
import {
    register,
    verifyOtp,
    resendOTP,
    forgotPassword,
    resetPassword
} from '../controllers/auth.controller';
import { validateBody } from '../middleware/zod.middleware';
import {
    SigninSchema,
    verifyOtpSchema,
    resendOtpSchema,
    forgotPasswordSchema,
    resetPasswordSchema
} from '../zod/auth.validator';
const router = express.Router();

router.post('/register', validateBody(SigninSchema), register);
router.post('/verify-otp', validateBody(verifyOtpSchema), verifyOtp);
router.post('/resend-otp', validateBody(resendOtpSchema), resendOTP);
router.post('/forgot-password', validateBody(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', validateBody(resetPasswordSchema), resetPassword);

export default router;
