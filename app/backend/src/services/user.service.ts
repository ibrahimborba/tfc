import UserModel from '../models/user.model';
import tokenHelper from '../helpers/token';
import BcryptHelper from '../helpers/bcrypt';
import { IUser, loginValidate } from '../interfaces/IUser';

type LoginResponse = {
  status: number,
  message?: string,
  token?: string,
};
export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(loginInput: IUser): Promise<LoginResponse> {
    const result = await this.model.findOne(loginInput.email);
    const { error } = loginValidate.validate(loginInput);
    if (error) {
      const [status, message] = error.message.split('|');
      return { status: Number(status), message };
    }

    if (!result || !BcryptHelper.compare(result.password, loginInput.password)) {
      return { status: 401, message: 'Incorrect email or password' };
    }

    const token = tokenHelper.create({ email: result.email });
    return { status: 200, token };
  }

  public async findOne(email: string): Promise<IUser> {
    const result = await this.model.findOne(email);
    return result;
  }
}
