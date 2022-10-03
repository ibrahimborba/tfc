import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';
// import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import ITeamBoard from '../interfaces/ITeamBoard';
import IEditedMatch from '../interfaces/IEditedMatch';

export default class LeaderboardService {
  public teamModel: TeamsModel;
  public matchModel: MatchesModel;

  constructor() {
    this.teamModel = new TeamsModel();
    this.matchModel = new MatchesModel();
  }

  public async findAllHome(): Promise<ITeamBoard[]> {
    const matches = await this.matchModel.queryAllHome();
    const teams = await this.teamModel.findAll();
    const homeTeams = teams.filter((team) => matches
      .some((match) => match.currTeamName === team.teamName))
      .map(LeaderboardService.generateTeamBoard);

    const leaderboard = LeaderboardService.generateLeaderboard(homeTeams, matches);
    return leaderboard;
  }

  public async findAllAway(): Promise<ITeamBoard[]> {
    const matches = await this.matchModel.queryAllAway();
    const teams = await this.teamModel.findAll();
    const awayTeams = teams.filter((team) => matches
      .some((match) => match.currTeamName === team.teamName))
      .map(LeaderboardService.generateTeamBoard);

    const leaderboard = LeaderboardService.generateLeaderboard(awayTeams, matches);
    return leaderboard;
  }
  /*
  public async findAll(): Promise<ITeamBoard[]> {
    const matches = await this.matchModel.queryAll(false);
    const teams = await this.teamModel.findAll();
    const allTeams = teams.map(LeaderboardService.generateTeamBoard);

    const leaderboard = await LeaderboardService.generateLeaderboard(allTeams, matches);
    return leaderboard;
  } */

  private static generateLeaderboard(teams: ITeamBoard[], matches: IEditedMatch[]): ITeamBoard[] {
    const leaderboard = teams.map((team) => matches.reduce((acc, match) => {
      if (match.currTeamName === team.name) {
        return LeaderboardService.calcTeamBoard(acc, match);
      }
      return acc;
    }, { ...team }));

    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);
    return sortedLeaderboard;
  }

  private static sortLeaderboard = (leaderboard: ITeamBoard[]): ITeamBoard[] => {
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

    return leaderboard;
  };

  private static generateTeamBoard = (team: ITeam) => ({
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

  private static calcTeamBoard = (acc: ITeamBoard, match: IEditedMatch) => {
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

  private static calcGoals = (acc: ITeamBoard, match: IEditedMatch) => {
    const goalsFavor = acc.goalsFavor + match.currTeamGoals;
    const goalsOwn = acc.goalsOwn + match.rivalTeamGoals;
    const goalsBalance = goalsFavor - goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance };
  };

  private static calcTotals = (acc: ITeamBoard, match: IEditedMatch) => {
    const totalGames = Number(acc.totalGames) + 1;
    const totalDraws = acc.totalDraws + Number(match.currTeamGoals === match.rivalTeamGoals);
    const totalVictories = acc.totalVictories + Number(match.currTeamGoals > match.rivalTeamGoals);
    const totalLosses = acc.totalLosses + Number(match.currTeamGoals < match.rivalTeamGoals);
    const totalPoints = totalVictories * 3 + totalDraws;
    return { totalPoints, totalGames, totalDraws, totalVictories, totalLosses };
  };
}
