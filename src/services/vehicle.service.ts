import { VehicleMap } from '../models/vehicle-map';
import { CoordinateService } from './coordinate.service';
import { BoardService } from './board.service';
import { Vehicle } from '../models/vehicle';
import { VehicleSpawnService } from './vehicle-spawn.service';
import { NameService } from './name.service';
import { ServerConfig } from '../configs/server.config';

export class VehicleService {
  private vehicleSpawnService: VehicleSpawnService
  constructor(
    private vehicleMap: VehicleMap,
    private boardService: BoardService,
    private nameService: NameService
  ) {
    this.vehicleSpawnService = new VehicleSpawnService(this.boardService);
  }

  private addVehicle(vehicleId: number) {
    const vehicle = new Vehicle(vehicleId);
    this.vehicleSpawnService.spawnNew(vehicle);
    if (vehicle.currentCoordinate) {
      this.vehicleMap.addVehicle(vehicle);
    }
  }

  private createVehicle() {
    if (Math.random() < ServerConfig.VEHICLE.SPAWN_RATE) {
      const vehicleId = this.nameService.getVehicleId();
      this.addVehicle(vehicleId);
    }
  }

  public moveVehicles() {
    for (let vehicle of this.vehicleMap.getVehicles()) {
      this.boardService.removeVehicleOccupancy(vehicle);
      CoordinateService.moveVehicle(vehicle);
      if (this.boardService.isOutOfBounds(vehicle.currentCoordinate) || !this.boardService.isStreet(vehicle.currentCoordinate)) {
        console.log('out of bounds');
      } else {
        this.boardService.addVehicleOccupancy(vehicle);
      }

    }
  }

  public generateVehicles() {
    this.createVehicle();
  }
}
