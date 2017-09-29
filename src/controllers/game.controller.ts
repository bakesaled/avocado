import { PlayerService } from '../services/player.service';
import { NameService } from '../services/name.service';
import { BoardService } from '../services/board.service';
import { GameState } from '../models/game-state';
import { NotificationService } from '../services/notification.service';
import { Level1Config } from '../configs/levels/level1.config';
import { VehicleService } from '../services/vehicle.service';
import { VehicleMap } from '../models/vehicle-map';
import { LevelConfig } from '../configs/levels/level.config';
import { StreetMap } from '../models/street-map';
import { StreetService } from '../services/street.service';
import { ServerConfig } from '../configs/server.config';
import Socket = SocketIO.Socket;
import { PlayerMap } from '../models/player-map';
import { StatBoard } from '../models/stat-board';

export class GameController {
  private nameService: NameService;
  private playerService: PlayerService;
  private boardService: BoardService;
  private notificationService: NotificationService;
  private vehicleMap: VehicleMap;
  private vehicleService: VehicleService;
  private levelConfig: LevelConfig;
  private streetMap: StreetMap;
  private streetService: StreetService;
  private playerMap: PlayerMap;
  private statBoard: StatBoard;

  constructor() {
    this.levelConfig = new Level1Config();
    this.statBoard = new StatBoard();
    this.streetMap = new StreetMap();
    this.vehicleMap = new VehicleMap();
    this.playerMap = new PlayerMap();
    this.boardService = new BoardService();
    this.nameService = new NameService();
    this.notificationService = new NotificationService();
    this.streetService = new StreetService(this.streetMap, this.boardService, this.nameService);
    this.vehicleService = new VehicleService(this.vehicleMap, this.boardService, this.nameService, this.streetMap, this.playerMap, this.statBoard);
    this.playerService = new PlayerService(this.nameService, this.playerMap, this.statBoard);
  }

  public listen(io: SocketIO.Server) {
    console.log('game controller is listening...');
    this.notificationService.init(io.sockets);

    io.sockets.on(ServerConfig.IO.CONNECTION, (socket: Socket) => {
      socket.on(ServerConfig.IO.INCOMING.NEW_PLAYER, (name, image) => {
        this.playerService.addPlayer(socket);
        this.streetService.generateStreets(this.levelConfig);
        this.runGameCycle(socket);
      });
      socket.on(ServerConfig.IO.INCOMING.DISCONNECT, () => {
        console.log('disco', socket.id);
        this.playerService.disconnect(socket.id);
      });
    });
  }

  public runGameCycle(socket: Socket) {
    if (this.playerMap.getNumberOfPlayers() === 0) {
      console.log('game paused');
      this.boardService.initializeBoards();
      this.nameService.reinitialize();
      this.playerMap.reinitialize();
      this.vehicleMap.reinitialize();
      this.streetMap.reinitialize();
      this.statBoard.reinitialize();
      return;
    }

    this.statBoard.changePopulation();
    this.vehicleService.moveVehicles();
    this.vehicleService.generateVehicles();

    const gameState = new GameState(
      this.streetMap.toJSON(),
      this.levelConfig.trafficCoordTiles,
      this.vehicleMap.toJSON(),
      this.statBoard.getPlayerStats(socket.id),
      this.statBoard.toJSON()
    );
    this.notificationService.notifyGameState(gameState);

    setTimeout(() => {
      this.runGameCycle(socket);
    }, 1000 / ServerConfig.STARTING_FPS);
  }
}
