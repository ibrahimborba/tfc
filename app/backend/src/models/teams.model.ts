import Team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

export default class TeamsModel {
  constructor(private model: typeof Team) {}

  public async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async findByPk(id: string | number): Promise<ITeam> {
    const result = await this.model.findByPk(id);
    return result as ITeam;
  }
}
