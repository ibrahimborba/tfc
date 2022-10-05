import { RequestHandler } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private service: MatchesService) { }

  public findAll:RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    const result = await this.service.findAll(inProgress as string);
    return res.status(200).json(result);
  };

  public create:RequestHandler = async (req, res) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const match = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
    const { status, message, result } = await this.service.create(match);
    if (!result) {
      return res.status(status).json({ message });
    }
    return res.status(status).json(result);
  };

  public finishMatch:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const message = await this.service.finishMatch(id);
    return res.status(200).json({ message });
  };

  public updateGoals:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const goals = { id, homeTeamGoals, awayTeamGoals };
    const message = await this.service.updateGoals(goals);
    return res.status(200).json({ message });
  };
}
