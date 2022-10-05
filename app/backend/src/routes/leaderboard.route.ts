import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';
import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';
import Team from '../database/models/team';
import Match from '../database/models/match';

const router = Router();

const leaderboardController = new LeaderboardController(new LeaderboardService(
  new TeamsModel(Team),
  new MatchesModel(Match),
));

router.get('/home', leaderboardController.findAllHome);
router.get('/away', leaderboardController.findAllAway);
router.get('/', leaderboardController.findAll);

export default router;
