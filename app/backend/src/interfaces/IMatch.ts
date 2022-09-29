import ITeam from './ITeam';

export default interface IMatch {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: number | boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
}
