import TeamsModel from '../models/teams.model';
import MatchesModel from '../models/matches.model';
// import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import ITeamBoard from '../interfaces/ITeamBoard';
import IEditedMatch from '../interfaces/IEditedMatch';
import Team from '../database/models/team';
import Match from '../database/models/match';

export default class LeaderboardService {
  public teamModel: TeamsModel;
  public matchModel: MatchesModel;

  constructor() {
    this.teamModel = new TeamsModel(Team);
    this.matchModel = new MatchesModel(Match);
  }

  public async findAllHome(): Promise<ITeamBoard[]> {
    const matches = await this.matchModel.queryAllHome();
    const teams = await this.teamModel.findAll();
    const emptyLeaderboard = teams.filter((team) => matches
      .some((match) => match.currTeamName === team.teamName))
      .map(LeaderboardService.createTeamBoard);

    const leaderboard = LeaderboardService.createLeaderboard(emptyLeaderboard, matches);
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);
    return sortedLeaderboard;
  }

  public async findAllAway(): Promise<ITeamBoard[]> {
    const matches = await this.matchModel.queryAllAway();
    const teams = await this.teamModel.findAll();
    const emptyLeaderboard = teams.filter((team) => matches
      .some((match) => match.currTeamName === team.teamName))
      .map(LeaderboardService.createTeamBoard);

    const leaderboard = LeaderboardService.createLeaderboard(emptyLeaderboard, matches);
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);
    return sortedLeaderboard;
  }

  public async findAll(): Promise<ITeamBoard[]> {
    const homeMatches = await this.matchModel.queryAllHome();
    const awayMatches = await this.matchModel.queryAllAway();
    const teams = await this.teamModel.findAll();
    const allTeams = teams.map(LeaderboardService.createTeamBoard);

    const homeLeaderboard = LeaderboardService.createLeaderboard(allTeams, homeMatches);
    const allLeaderboard = LeaderboardService.createLeaderboard(homeLeaderboard, awayMatches);
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(allLeaderboard);
    return sortedLeaderboard;
  }

  private static createLeaderboard(teams: ITeamBoard[], matches: IEditedMatch[]): ITeamBoard[] {
    const leaderboard = teams.map((team) => matches.reduce((acc, match) => {
      if (match.currTeamName === team.name) {
        return LeaderboardService.calcTeamBoard(acc, match);
      }
      return acc;
    }, { ...team }));
    return leaderboard;
  }

  private static sortLeaderboard = (leaderboard: ITeamBoard[]): ITeamBoard[] => {
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

    return leaderboard;
  };

  private static createTeamBoard = (team: ITeam) => ({
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
