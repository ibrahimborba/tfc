import MatchesModel from '../models/matches.model';
import IMatch from '../interfaces/IMatch';

export default class MatchesService {
  public model: MatchesModel;

  constructor() {
    this.model = new MatchesModel();
  }

  public async findAll(): Promise<IMatch[]> {
    const result = await this.model.findAll();
    return result;
  }
}
