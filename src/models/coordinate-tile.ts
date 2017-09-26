import { Coordinate } from './coordinate';
import { Tile } from './tile';
import { Vehicle } from './vehicle';
import { Street } from './street';

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

  public setStreetTile(street: Street) {
    this.tile.streetId = street.id;
  }

  public isOccupied() {
    return this.tile.vehicleId;
  }

  public isStreet() {
    return this.tile.streetId;
  }
}
