import { hashPassword, logger } from "../utils";
import { config } from "../config/index";
import {
    user_service,
    response_service,
    token_service
} from "../services/index.service";
import { Request, Response } from 'express';
import removeExtraFields from "../services/common/removeExtraFields.service";
import { sendEmailOTP, sendResetPasswordLink } from "../utils/email";

async function register(req: Request, res: Response) {
    try {
        if (req.body.login_type == 'email') {
            const is_singer = req.body.is_singer.toLowerCase() == 'true' ? true : false;
            let user = await user_service.getUser({ email: req.body.email });
            let otp = config.nodeEnv === 'development' ? '123456' : generateOTP();
            const otpSent = await sendEmailOTP(req.body.email, otp);
            if (!otpSent) {
                return response_service.badRequestResponse(res, 'Failed to send OTP.');
            }
            if (user) {
                return response_service.successResponse(res, 'OTP sent successfully.', { newUser: false });
            }
            else {
                await user_service.createUser({ ...req.body, is_singer: is_singer, otp });
                return response_service.successResponse(res, 'OTP sent successfully.', { newUser: true });
            }
        }
    }
    catch (err: any) {
        logger.error('Error registering user:', err);
        return response_service.internalServerErrorResponse(res, err.message);
    }
}

async function resendOTP(req: Request, res: Response) {
    try {
        let otp = config.nodeEnv === 'development' ? '123456' : generateOTP();
        const otpSent = await sendEmailOTP(req.body.email, otp);
        if (!otpSent) {
            return response_service.badRequestResponse(res, 'Failed to send OTP.');
        }
        const user = await user_service.updateUser({ otp: parseInt(otp) }, { email: req.body.email });
        if (user) return response_service.successResponse(res, 'OTP resent successfully.');
        return response_service.badRequestResponse(res, 'Email not registered.');
    } catch (err: any) {
        logger.error('Error resending OTP:', err);
        return response_service.internalServerErrorResponse(res, err.message);
    }
}

// To Genrate OTP
function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

async function verifyOtp(req: Request, res: Response) {
    try {
        let user = await user_service.getUser({ email: req.body.email, otp: req.body.otp });
        if (user) {
            const token = await token_service.generateToken(user);
            await user_service.updateUser({ login_verification_status: true, otp: 0 }, { email: req.body.email });
            return response_service.successResponse(res, 'OTP verified successfully.', { user: removeExtraFields(user, ['otp', 'login_verification_status', 'password', 'login_type', 'is_admin', 'device_token']), token });
        }
        else {
            return response_service.badRequestResponse(res, 'Invalid otp.');
        }
    } catch (err: any) {
        logger.error('Error verifying OTP:', err);
        return response_service.internalServerErrorResponse(res, err.message);
    }
}

async function forgotPassword(req: Request, res: Response) {
    try {
        let user = await user_service.getUser({ email: req.body.email });
        if (!user) {
            return response_service.badRequestResponse(res, 'Email not registerd.');
        }
        const token = await token_service.generateToken(user);
        const resetLink = `${config.frontend_url}/api/auth/reset-password/${token}`;
        const linkSent = await sendResetPasswordLink(req.body.email, resetLink);
        if (linkSent) {
            return response_service.successResponse(res, 'Reset password link sent successfully.');
        }
        return response_service.badRequestResponse(res, 'Failed to send reset password link.');
    } catch (err: any) {
        logger.error('Error sending reset password link:', err);
        return response_service.internalServerErrorResponse(res, err.message);
    }
}

async function resetPassword(req: Request, res: Response) {
    try {
        const { user_id } = await token_service.verifyToken(req.params.token);
        let user = await user_service.getUser({ user_id });
        if (!user) return response_service.badRequestResponse(res, 'Invalid link.');
        const hashedPw = await hashPassword(req.body.password)
        user = await user_service.updateUser({ password: hashedPw }, { email: user.email });
        if (user) return response_service.successResponse(res, 'Password reset successfully.');
        return response_service.badRequestResponse(res, 'Failed to reset password.');
    } catch (err: any) {
        logger.error('Error resetting password:', err);
        return response_service.internalServerErrorResponse(res, err.message);
    }
}

export {
    register,
    verifyOtp,
    resendOTP,
    forgotPassword,
    resetPassword
};