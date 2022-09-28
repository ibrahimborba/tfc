import UserModel from '../models/user.model';
import tokenHelper from '../helpers/token';
import BcryptHelper from '../helpers/bcrypt';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(email: string, password: string): Promise<string> {
    const result = await this.model.findOne(email);
    BcryptHelper.compare(password, result.password);
    const token = tokenHelper.create({ email: result.email });
    return token;
  }
}
