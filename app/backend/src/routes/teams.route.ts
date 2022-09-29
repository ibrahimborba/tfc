import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.findAll);
router.get('/:id', teamsController.findByPk);

export default router;
