import { NameService } from './name.service';
import { Player } from '../models/player';
import Socket = SocketIO.Socket;
import { BoardConfig } from '../configs/board.config';

export class PlayerService {
  constructor(private nameService: NameService){}

  public addPlayer(socket: Socket) {
    const playerName = this.nameService.getPlayerName();
    const newPlayer = this.createPlayer(socket.id, playerName);

    socket.emit('new player info', newPlayer.name);
    socket.emit('board info', BoardConfig.layers);

    console.log('player created', playerName);
  }

  private createPlayer(id: string, name: string) {
    const player = new Player(id, name);
    return player;
  }
}
