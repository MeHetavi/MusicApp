import { Request, Response, NextFunction } from 'express';
import { response_service, user_service, token_service } from '../services/index.service';
// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const { user_id } = token_service.verifyToken(token);
        const user = await user_service.getUser({ user_id: user_id });
        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error: any) {
        return response_service.forbiddenResponse(res, error.message || 'Authentication failed. Please log in again.');
    }
}; 