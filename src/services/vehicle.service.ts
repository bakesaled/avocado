import { VehicleMap } from '../models/vehicle-map';
import { CoordinateService } from './coordinate.service';
import { BoardService } from './board.service';
import { Vehicle } from '../models/vehicle';
import { VehicleSpawnService } from './vehicle-spawn.service';
import { NameService } from './name.service';
import { StreetMap } from '../models/street-map';
import { PlayerMap } from '../models/player-map';
import { ServerConfig } from '../configs/server.config';
import { StatBoard } from '../models/stat-board';
import { Player } from '../models/player';

export class VehicleService {
  private vehicleSpawnService: VehicleSpawnService
  constructor(
    private vehicleMap: VehicleMap,
    private boardService: BoardService,
    private nameService: NameService,
    private streetMap: StreetMap,
    private playerMap: PlayerMap,
    private statBoard: StatBoard
  ) {
    this.vehicleSpawnService = new VehicleSpawnService(this.boardService, this.streetMap);
  }

  public addVehicle(vehicleId: number): Vehicle {
    const vehicle = new Vehicle(vehicleId);
    this.vehicleSpawnService.spawnNew(vehicle);
    if (vehicle.currentCoordinate) {
      this.vehicleMap.addVehicle(vehicle);
    }

    return vehicle;
  }

  public createVehicle() {
    const vehicleId = this.nameService.getVehicleId();
    this.addVehicle(vehicleId);
  }

  public moveVehicles() {
    for (let vehicle of this.vehicleMap.getVehicles()) {
      this.boardService.removeVehicleOccupancy(vehicle);
      CoordinateService.moveVehicle(vehicle);
      if (this.boardService.isOutOfBounds(vehicle.currentCoordinate)) {
        this.vehicleMap.removeVehicle(vehicle.id);
      } else if (!this.boardService.isStreet(vehicle.currentCoordinate)) {
        this.vehicleMap.removeVehicle(vehicle.id);
      } else {
        this.boardService.addVehicleOccupancy(vehicle);
      }
    }
  }

  public generateVehicles() {
    this.playerMap.getPlayers().forEach((player: Player, playerId: string) => {
      const rate = ServerConfig.VEHICLE.SPAWN_RATE * this.statBoard.getPopulation(player.id);
      if (Math.random() < rate) {
        this.createVehicle();
      }
    });
  }
}
