import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import UserModel from '../models/user.model';
import User from '../database/models/user';

const router = Router();

const userController = new UserController(new UserService(new UserModel(User)));

router.post('/', userController.login);

router.get('/validate', authMiddleware.tokenValidation, userController.getRole);

export default router;
