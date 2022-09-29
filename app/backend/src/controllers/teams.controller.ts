import { RequestHandler } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private service = new TeamsService()) { }

  public findAll:RequestHandler = async (_req, res) => {
    const result = await this.service.findAll();
    return res.status(200).json(result);
  };
}
