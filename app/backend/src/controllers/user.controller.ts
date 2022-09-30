import { RequestHandler } from 'express';
import UsersService from '../services/user.service';

export default class UserController {
  constructor(private service = new UsersService()) { }

  public login:RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.service.login({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public getRole:RequestHandler = async (req, res) => {
    const { email } = res.locals;
    const { role } = await this.service.findOne(email);
    return res.status(200).json({ role });
  };
}
