import { RequestHandler } from 'express';
import UsersService from '../services/user.service';

export default class UserController {
  constructor(private service = new UsersService()) { }

  public login:RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const { status, message, token } = await this.service.login({ email, password });
    if (!token) return res.status(status).json({ message });
    return res.status(status).json({ token });
  };

  public getRole:RequestHandler = async (req, res) => {
    const { email } = res.locals;
    const { role } = await this.service.findOne(email);
    return res.status(200).json({ role });
  };
}
