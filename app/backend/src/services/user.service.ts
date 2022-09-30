import UserModel from '../models/user.model';
import tokenHelper from '../helpers/token';
import BcryptHelper from '../helpers/bcrypt';
import { IUser, loginValidate } from '../interfaces/IUser';
import ValidationError from '../errors/ValidationError';
import AuthenticationError from '../errors/AuthenticationError';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(loginInput: IUser): Promise<string> {
    const result = await this.model.findOne(loginInput.email);
    const { error } = loginValidate.validate(loginInput);
    if (error) {
      const [status, message] = error.message.split('|');
      throw new ValidationError(Number(status), message);
    }

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
