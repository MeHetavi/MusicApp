import { user_service, response_service } from "../services/index.service";
import { Request, Response } from "express";
import { logger } from "../utils";
import removeExtraFields from "../services/common/removeExtraFields.service";


async function getUser(req: Request, res: Response) {
    try {
        const user = await user_service.getUser({ user_id: req.user.user_id });
        if (!user) return response_service.notFoundResponse(res, 'User not found.');
        return response_service.successResponse(res, 'User retrieved successfully.', removeExtraFields(user, ['otp', 'login_verification_status', 'password', 'login_type', 'is_admin', 'device_token']));
    } catch (err: any) {
        logger.error('Error retrieving user:', err);
        return response_service.internalServerErrorResponse(res, err.message);
    }
}

/**
 * Updates the user information.
 * @param req - The request object containing user data to update.
 * @param res - The response object to send the result.
 * @returns A success response with updated user data or an error response.
 */
async function updateUser(req: Request, res: Response) {
    try {
        if (req.body.is_singer) {
            req.body.is_singer = req.body.is_singer.toLowerCase() == 'true' ? true : false;
        }
        const user = await user_service.updateUser(req.body, { user_id: req.user.user_id });
        return response_service.successResponse(res, 'User updated successfully.', removeExtraFields(user, ['otp', 'login_verification_status', 'password', 'login_type', 'is_admin', 'device_token']));

    } catch (err: any) {
        logger.error('Error updating user:', err);
        return response_service.internalServerErrorResponse(res, err.message);
    }

}

export { getUser, updateUser }