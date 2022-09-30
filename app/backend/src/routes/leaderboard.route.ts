import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.findAllHome);
router.get('/away', leaderboardController.findAllAway);
router.get('/', leaderboardController.findAll);

export default router;
