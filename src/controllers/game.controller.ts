import { PlayerService } from '../services/player.service';
import { NameService } from '../services/name.service';
import { BoardService } from '../services/board.service';
import { GameState } from '../models/game-state';
import { NotificationService } from '../services/notification.service';
import { Level1Config } from '../configs/levels/level1.config';
import { VehicleService } from '../services/vehicle.service';
import { VehicleMap } from '../models/vehicle-map';
import { LevelConfig } from '../configs/levels/level.config';

export class GameController {
  private nameService: NameService;
  private playerService: PlayerService;
  private boardService: BoardService;
  private notificationService: NotificationService;
  private vehicleMap: VehicleMap;
  private vehicleService: VehicleService;
  private levelConfig: LevelConfig;

  constructor() {
    this.levelConfig = new Level1Config();
    this.vehicleMap = new VehicleMap();
    this.boardService = new BoardService(this.levelConfig);
    this.nameService = new NameService();
    this.notificationService = new NotificationService();
    this.vehicleService = new VehicleService(this.vehicleMap, this.boardService, this.nameService);
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

    this.vehicleService.moveVehicles();
    this.vehicleService.generateVehicles();

    const gameState = new GameState(
      this.levelConfig.backgroundCoordTiles,
      this.levelConfig.trafficCoordTiles,
      this.vehicleMap.toJSON()
    );
    this.notificationService.notifyGameState(gameState);

    setTimeout(() => {
      this.runGameCycle();
    }, 1000);
  }
}
