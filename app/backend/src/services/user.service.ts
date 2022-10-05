import UserModel from '../models/user.model';
import tokenHelper from '../helpers/token';
import BcryptHelper from '../helpers/bcrypt';
import IUser from '../interfaces/IUser';
import AuthenticationError from '../errors/AuthenticationError';
import Login from '../entities/Login';

export default class UserService {
  constructor(private model: UserModel) { }

  public async login(loginInput: IUser): Promise<string> {
    const userLogin = new Login(loginInput.email, loginInput.password);

    const result = await this.model.findOne(userLogin.email);

    if (!result || !BcryptHelper.compare(result.password, loginInput.password)) {
      throw new AuthenticationError('Incorrect email or password');
    }

    const token = tokenHelper.create({ email: result.email });
    return token;
  }

  public async findOne(email: string): Promise<IUser> {
    const result = await this.model.findOne(email);
    return result;
  }
}
