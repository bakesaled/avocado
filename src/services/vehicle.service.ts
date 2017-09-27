import { VehicleMap } from '../models/vehicle-map';
import { CoordinateService } from './coordinate.service';
import { BoardService } from './board.service';
import { Vehicle } from '../models/vehicle';
import { VehicleSpawnService } from './vehicle-spawn.service';
import { NameService } from './name.service';
import { ServerConfig } from '../configs/server.config';
import { StreetMap } from '../models/street-map';

export class VehicleService {
  private vehicleSpawnService: VehicleSpawnService
  constructor(
    private vehicleMap: VehicleMap,
    private boardService: BoardService,
    private nameService: NameService,
    private streetMap: StreetMap
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
    if (Math.random() < ServerConfig.VEHICLE.SPAWN_RATE) {
      this.createVehicle();
    }
  }
}
