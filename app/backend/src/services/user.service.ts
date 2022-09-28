import UserModel from '../models/user.model';
import tokenHelper from '../helpers/token';
import BcryptHelper from '../helpers/bcrypt';
import { ILogin, loginValidate } from '../interfaces/ILogin';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(loginInput: ILogin): Promise<string> {
    const result = await this.model.findOne(loginInput.email);
    const { error } = loginValidate.validate(loginInput);
    if (error) return error.message;

    BcryptHelper.compare(loginInput.password, result.password);

    const token = tokenHelper.create({ email: result.email });
    return token;
  }
}
