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

  constructor() {
    this.levelConfig = new Level1Config();
    this.streetMap = new StreetMap();
    this.vehicleMap = new VehicleMap();
    this.boardService = new BoardService(this.levelConfig);
    this.nameService = new NameService();
    this.notificationService = new NotificationService();
    this.streetService = new StreetService(this.streetMap, this.boardService, this.nameService);
    this.vehicleService = new VehicleService(this.vehicleMap, this.boardService, this.nameService, this.streetMap);
    this.playerService = new PlayerService(this.nameService);
  }

  public listen(io: SocketIO.Server) {
    console.log('game controller is listening...');
    this.notificationService.init(io.sockets);

    io.sockets.on('connection', (socket) => {
      socket.on('new player', (name, image) => {
        this.playerService.addPlayer(socket);
        this.streetService.generateStreets(this.levelConfig);
        this.runGameCycle();

      });
    });
  }

  public runGameCycle() {
    console.log('game cycle is running');

    this.vehicleService.moveVehicles();
    this.vehicleService.generateVehicles();
    console.log('mapcount', this.vehicleMap.toJSON().length);

    const gameState = new GameState(
      this.streetMap.toJSON(),
      this.levelConfig.trafficCoordTiles,
      this.vehicleMap.toJSON()
    );
    this.notificationService.notifyGameState(gameState);

    setTimeout(() => {
      this.runGameCycle();
    }, 1000 / ServerConfig.STARTING_FPS);
  }
}
