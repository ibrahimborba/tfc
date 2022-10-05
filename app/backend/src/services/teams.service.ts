import TeamsModel from '../models/teams.model';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  constructor(private model: TeamsModel) { }

  public async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async findByPk(id: string): Promise<ITeam> {
    const result = await this.model.findByPk(id);
    return result;
  }
}
