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
    const result = await this.service.create(match);
    if (!result) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    return res.status(201).json(result);
  };

  public update:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const message = await this.service.update(id);
    return res.status(200).json({ message });
  };
}
