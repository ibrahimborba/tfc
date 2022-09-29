import { RequestHandler } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private service = new MatchesService()) { }

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

  public update:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const message = await this.service.update(id);
    return res.status(200).json({ message });
  };
}
