import userModel from '../database/models/user';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  public model = userModel;

  public async findOne(email: string): Promise<IUser> {
    const result = await this.model.findOne({ where: { email } });
    return result as IUser;
  }
}
