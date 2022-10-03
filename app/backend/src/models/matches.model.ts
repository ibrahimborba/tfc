import Team from '../database/models/team';
import matchModel from '../database/models/match';
import IMatch from '../interfaces/IMatch';
import IGoals from '../interfaces/IGoals';
import IEditedMatch from '../interfaces/IEditedMatch';

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

  public async queryAllHome(): Promise<IEditedMatch[]> {
    const result = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      ],
    });

    const editedMatches = result.map(MatchesModel.generateHomeMatch);
    return editedMatches;
  }

  public async queryAllAway(): Promise<IEditedMatch[]> {
    const result = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    const editedMatches = result.map(MatchesModel.generateAwayMatch);
    return editedMatches;
  }

  private static generateHomeMatch = (match: IMatch) => ({
    currTeamName: match.teamHome?.teamName,
    currTeamGoals: match.homeTeamGoals,
    rivalTeamGoals: match.awayTeamGoals,
  });

  private static generateAwayMatch = (match: IMatch) => ({
    currTeamName: match.teamAway?.teamName,
    currTeamGoals: match.awayTeamGoals,
    rivalTeamGoals: match.homeTeamGoals,
  });

  public async create(match: IMatch): Promise<IMatch> {
    const result = await this.model.create(match);
    return result;
  }

  public async finishMatch(id: string): Promise<string> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  }

  public async updateGoals(goals: IGoals): Promise<string> {
    const { id, homeTeamGoals, awayTeamGoals } = goals;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return 'Updated';
  }
}
