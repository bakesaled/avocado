import { NameService } from './name.service';
import { Player } from '../models/player';
import Socket = SocketIO.Socket;
import { BoardConfig } from '../configs/board.config';
import { PlayerMap } from '../models/player-map';
import { StatBoard } from '../models/stat-board';

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

  private createPlayer(id: string, name: string) {
    const player = new Player(id, name);
    this.playerMap.addPlayer(player);
    this.playerStatBoard.addPlayer(player.id, player.name);
    return player;
  }
}
