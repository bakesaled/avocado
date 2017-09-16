import { PlayerService } from '../services/player.service';
import { NameService } from '../services/name.service';
import { BoardService } from '../services/board.service';

export class GameController {
  private nameService: NameService;
  private playerService: PlayerService;
  private boardService: BoardService;

  constructor() {
    this.boardService = new BoardService();
    this.nameService = new NameService();
    this.playerService = new PlayerService(this.nameService);
  }

  public listen(io: SocketIO.Server) {
    console.log('game controller is listening...');

    io.sockets.on('connection', (socket) => {
      socket.on('new player', (name, image) => {
        this.playerService.addPlayer(socket);
        this.runGameCycle();

      });
    });
  }

  public runGameCycle() {
    console.log('game cycle is running');
    setTimeout(() => {
      this.runGameCycle();
    }, 1000);
  }
}
