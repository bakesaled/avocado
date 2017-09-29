import { PlayerStats } from './player-stats';

export class StatBoard {
  private playerStatBoard: Map<string, PlayerStats>;

  constructor() {
    this.playerStatBoard = new Map();
  }

  public reinitialize() {
    this.playerStatBoard.clear();
  }

  public addPlayer(playerId: string, playerName: string) {
    this.playerStatBoard.set(playerId, new PlayerStats(playerName));
  }

  public increasePopulation(playerId: string, amount: number) {
    this.playerStatBoard.get(playerId).increasePopulation(amount);
  }

  public decreasePopulation(playerId: string, amount: number) {
    this.playerStatBoard.get(playerId).decreasePopulation(amount);
  }

  public getPopulation(playerId: string) {
    return this.getPlayerStats(playerId).population;
  }

  public changePopulation() {
    const rand = Math.random();
    this.playerStatBoard.forEach((value: PlayerStats, playerId: string) => {
      if (rand < 0.2) {
        this.increasePopulation(playerId, 10);
      }
      else if (rand > 0.9) {
        this.decreasePopulation(playerId, 10);
      }
    });
  }

  public getPlayerStats(playerId: string) {
    return this.playerStatBoard.get(playerId);
  }

  public toJSON() {
    const result: Array<PlayerStats> = [];
    this.playerStatBoard.forEach(item => {
      result.push(item);
    });

    return result;
  }
}
