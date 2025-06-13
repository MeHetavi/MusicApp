import { authenticate } from "../middleware/auth.middleware";
import { getUser, updateUser } from "../controllers/user.controller";
import { Router } from "express";
import { validateBody } from "../middleware/zod.middleware";
import { updateUserSchema } from "../zod/user.validator";

const router = Router();

router.use(authenticate)
router.get('/profile', getUser);
router.put('/update', validateBody(updateUserSchema), updateUser);

export default router;