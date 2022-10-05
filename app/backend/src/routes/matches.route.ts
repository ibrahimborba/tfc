import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';
import MatchesModel from '../models/matches.model';
import TeamsModel from '../models/teams.model';
import Match from '../database/models/match';
import Team from '../database/models/team';

const router = Router();

const matchesController = new MatchesController(new MatchesService(
  new MatchesModel(Match),
  new TeamsModel(Team),
));

router.route('/')
  .get(matchesController.findAll)
  .post(authMiddleware.tokenValidation, matchesController.create);

router.route('/:id/finish')
  .patch(matchesController.finishMatch);

router.route('/:id')
  .patch(matchesController.updateGoals);

export default router;
