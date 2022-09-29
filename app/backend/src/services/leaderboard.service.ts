import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';

type TeamBoard = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalDraws: number,
  totalVictories: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
};

export default class LeaderboardService {
  public teamModel: TeamsModel;
  public matchModel: MatchesModel;

  constructor() {
    this.teamModel = new TeamsModel();
    this.matchModel = new MatchesModel();
  }

  public async findAll(): Promise<TeamBoard[]> {
    const matches = await this.matchModel.queryAll(false);
    const teams = await this.teamModel.findAll();
    const homeTeams = teams.filter((team) => matches
      .some((match) => match.teamHome?.teamName === team.teamName))
      .map(LeaderboardService.generateLeaderboard);

    const leaderboard = homeTeams.map((team) => matches.reduce((acc, match) => {
      if (match.teamHome?.teamName === team.name) {
        return LeaderboardService.calcLeaderboard(acc, match);
      }
      return acc;
    }, { ...team }));

    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

    return leaderboard;
  }

  private static generateLeaderboard = (team: ITeam) => ({
    name: team.teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  });

  private static calcLeaderboard = (acc: TeamBoard, match: IMatch) => {
    const { goalsFavor, goalsOwn, goalsBalance } = LeaderboardService.calcGoals(acc, match);
    const { totalPoints, totalGames, totalDraws, totalVictories, totalLosses } = LeaderboardService
      .calcTotals(acc, match);
    const efficiencyDecimal = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    const efficiency = String(efficiencyDecimal);
    return {
      ...acc,
      totalPoints,
      totalGames,
      totalDraws,
      totalVictories,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  };

  private static calcGoals = (acc: TeamBoard, match: IMatch) => {
    const goalsFavor = acc.goalsFavor + match.homeTeamGoals;
    const goalsOwn = acc.goalsOwn + match.awayTeamGoals;
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  };

  private static calcTotals = (acc: TeamBoard, match: IMatch) => {
    const totalGames = Number(acc.totalGames) + 1;
    const totalDraws = acc.totalDraws + Number(match.homeTeamGoals === match.awayTeamGoals);
    const totalVictories = acc.totalVictories + Number(match.homeTeamGoals > match.awayTeamGoals);
    const totalLosses = acc.totalLosses + Number(match.homeTeamGoals < match.awayTeamGoals);
    const totalPoints = totalVictories * 3 + totalDraws;
    return { totalPoints, totalGames, totalDraws, totalVictories, totalLosses };
  };
}
