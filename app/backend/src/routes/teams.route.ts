import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';
import TeamsModel from '../models/teams.model';
import Team from '../database/models/team';

const router = Router();

const teamsController = new TeamsController(new TeamsService(new TeamsModel(Team)));

router.get('/', teamsController.findAll);
router.get('/:id', teamsController.findByPk);

export default router;
