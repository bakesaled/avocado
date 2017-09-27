import { Player } from './player';

export class PlayerMap {
  private players: Map<string, Player>;

  constructor() {
    this.players = new Map();
  }

  public reinitialize() {
    this.players.clear();
  }

  public addPlayer(player: Player) {
    this.players.set(player.id, player);
  }

  public getPlayer(playerId: string) {
    return this.players.get(playerId);
  }

  public getPlayers() {
    return this.players.values();
  }

  public getNumberOfPlayers() {
    return this.players.size;
  }

  public removePlayer(playerId: string) {
    this.players.delete(playerId);
  }

  public toJSON() {
    const results: Array<Player> = [];
    this.players.forEach(player => {
      results.push(player);
    });

    return results;
  }
}

