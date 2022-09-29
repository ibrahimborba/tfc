import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const router = Router();

const userController = new UserController();

router.post('/', userController.login);

router.get('/validate', authMiddleware.tokenValidation, userController.getRole);

export default router;
