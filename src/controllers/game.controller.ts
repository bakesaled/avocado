import { PlayerService } from '../services/player.service';
import { NameService } from '../services/name.service';
import { BoardService } from '../services/board.service';
import { GameState } from '../models/game-state';
import { NotificationService } from '../services/notification.service';
import { Level1Config } from '../configs/levels/level1.config';

export class GameController {
  private nameService: NameService;
  private playerService: PlayerService;
  private boardService: BoardService;
  private notificationService: NotificationService;

  constructor() {
    this.boardService = new BoardService();
    this.nameService = new NameService();
    this.notificationService = new NotificationService();
    this.playerService = new PlayerService(this.nameService);
  }

  public listen(io: SocketIO.Server) {
    console.log('game controller is listening...');
    this.notificationService.init(io.sockets);

    io.sockets.on('connection', (socket) => {
      socket.on('new player', (name, image) => {
        this.playerService.addPlayer(socket);
        this.runGameCycle();

      });
    });
  }

  public runGameCycle() {
    console.log('game cycle is running');

    const level1 = new Level1Config();

    const gameState = new GameState(
      level1.backgroundCoordTiles
    );
    this.notificationService.notifyGameState(gameState);

    setTimeout(() => {
      this.runGameCycle();
    }, 1000);
  }
}
