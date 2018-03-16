import { NameService } from './name.service';
import { Player } from '../models/player';
import Socket = SocketIO.Socket;
import { BoardConfig } from '../configs/board.config';
import { PlayerMap } from '../models/player-map';
import { StatBoard } from '../models/stat-board';
import { PlayerStats } from '../models/player-stats';
import { ServerConfig } from '../configs/server.config';

export class PlayerService {
  constructor(
    private nameService: NameService,
    private playerMap: PlayerMap,
    private playerStatBoard: StatBoard
  ){}

  public addPlayer(socket: Socket) {
    const playerName = this.nameService.getPlayerName();
    const newPlayer = this.createPlayer(socket.id, playerName);

    socket.emit('new player info', newPlayer.name);
    socket.emit('board info', BoardConfig.layers);

    console.log('player created', playerName);
  }

  public disconnect(playerId: string) {
    const player = this.playerMap.getPlayer(playerId);
    if (!player) {
      return;
    }

    this.playerMap.removePlayer(player.id);
  }

  public changePopulations() {
    this.playerStatBoard.getBoard().forEach((value: PlayerStats, playerId: string) => {
      const rand = Math.random();
      if (rand < 0.2) {
        this.playerStatBoard.increasePopulation(playerId, 10);
      }
      else if (rand > 0.9) {
        this.playerStatBoard.decreasePopulation(playerId, 10);
      }
    });
  }

  public collectTax() {
    this.playerStatBoard.getBoard().forEach((value: PlayerStats, playerId: string) => {
      const population = this.playerStatBoard.getPopulation(playerId);
      this.playerStatBoard.addCash(playerId, population / ServerConfig.TOWN.HOUSEHOLD_SIZE * 10000 * ServerConfig.TOWN.TAX_RATE)
    });
  }

  private createPlayer(id: string, name: string) {
    const player = new Player(id, name);
    this.playerMap.addPlayer(player);
    this.playerStatBoard.addPlayer(player.id, player.name);
    return player;
  }
}
