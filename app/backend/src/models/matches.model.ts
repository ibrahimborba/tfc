import Team from '../database/models/team';
import matchModel from '../database/models/match';
import IMatch from '../interfaces/IMatch';

export default class MatchesModel {
  public model = matchModel;

  public async findAll(): Promise<IMatch[]> {
    const result = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  }

  public async queryAll(inProgress: boolean): Promise<IMatch[]> {
    const result = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  }

  public async create(match: IMatch): Promise<IMatch> {
    const result = await this.model.create(match);
    return result;
  }

  public async update(id: string): Promise<string> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  }
}
