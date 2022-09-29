import teamModel from '../database/models/team';
import ITeam from '../interfaces/ITeam';

export default class TeamsModel {
  public model = teamModel;

  public async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async findByPk(id: string): Promise<ITeam> {
    const result = await this.model.findByPk(id);
    return result as ITeam;
  }
}
