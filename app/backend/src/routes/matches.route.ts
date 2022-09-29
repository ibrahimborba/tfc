import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.route('/')
  .get(matchesController.findAll)
  .post(authMiddleware.tokenValidation, matchesController.create);

router.route('/:id/finish')
  .patch(matchesController.update);

export default router;
