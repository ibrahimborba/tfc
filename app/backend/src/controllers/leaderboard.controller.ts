import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) { }

  public findAllHome:RequestHandler = async (_req, res) => {
    const result = await this.service.findAllHome();
    return res.status(200).json(result);
  };
/*
  public findAllAway:RequestHandler = async (_req, res) => {
    const result = await this.service.findAllAway();
    return res.status(200).json(result);
  };

  public findAll:RequestHandler = async (_req, res) => {
    const result = await this.service.findAll();
    return res.status(200).json(result);
  }; */
}
