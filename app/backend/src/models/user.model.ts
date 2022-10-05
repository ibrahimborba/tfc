import User from '../database/models/user';
import IUser from '../interfaces/IUser';

export default class UserModel {
  constructor(private model: typeof User) {}

  public async findOne(email: string): Promise<IUser> {
    const result = await this.model.findOne({ where: { email } });
    return result as IUser;
  }
}
