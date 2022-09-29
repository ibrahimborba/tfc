import MatchesModel from '../models/matches.model';
import IMatch from '../interfaces/IMatch';

export default class MatchesService {
  public model: MatchesModel;

  constructor() {
    this.model = new MatchesModel();
  }

  public async findAll(inProgress: string): Promise<IMatch[]> {
    if (inProgress) {
      const inProgressBool = JSON.parse(inProgress as string);
      const result = await this.model.queryAll(inProgressBool);
      return result;
    }
    const result = await this.model.findAll();
    return result;
  }

  public async create(match: IMatch): Promise<IMatch | null> {
    if (match.homeTeam === match.awayTeam) {
      return null;
    }
    const result = await this.model.create({ ...match, inProgress: true });
    return result;
  }

  public async update(id: string): Promise<string> {
    const result = await this.model.update(id);
    return result;
  }
}
