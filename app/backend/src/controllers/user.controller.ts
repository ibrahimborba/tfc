import { RequestHandler } from 'express';
import UsersService from '../services/user.service';

class UserController {
  constructor(private service = new UsersService()) { }

  public login:RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    res.status(200).json({ token: result });
  };
}

export default UserController;
