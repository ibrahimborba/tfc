import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) { }

  public findAll:RequestHandler = async (_req, res) => {
    const result = await this.service.findAll();
    return res.status(200).json(result);
  };
}