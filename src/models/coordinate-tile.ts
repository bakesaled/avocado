import { Coordinate } from './coordinate';
import { Tile } from './tile';
import { Vehicle } from './vehicle';

export class CoordinateTile {
  constructor(
    public coordinate: Coordinate,
    public tile: Tile
  ) {}

  public setVehicleTile(vehicle: Vehicle) {
    this.tile.vehicleId = vehicle.id;
  }

  public clearVehicleTile() {
    this.tile.vehicleId = 0;
  }

  public isUnoccupied() {
    return !this.tile.vehicleId;
  }

  public isStreet() {
    return this.tile.streetId;
  }
}
