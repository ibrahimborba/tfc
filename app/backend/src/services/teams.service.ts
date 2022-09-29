import TeamsModel from '../models/teams.model';
import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  public model: TeamsModel;

  constructor() {
    this.model = new TeamsModel();
  }

  public async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async findByPk(id: string): Promise<ITeam> {
    const result = await this.model.findByPk(id);
    return result;
  }
}
