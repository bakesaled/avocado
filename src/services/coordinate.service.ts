import { Vehicle } from '../models/vehicle';
import { Coordinate } from '../models/coordinate';
import { Direction } from '../models/direction';

export class CoordinateService {
  public static moveVehicle(vehicle: Vehicle) {
    vehicle.move(this.getNextCoordinate(vehicle.currentCoordinate, vehicle.currentDirection));
  }

  public static getNextCoordinate(currentCoordinate: Coordinate, direction: Direction) {
    switch (direction) {
      case Direction.Up:
        return new Coordinate(currentCoordinate.x, currentCoordinate.y - 1);
      case Direction.Down:
        return new Coordinate(currentCoordinate.x, currentCoordinate.y + 1);
      case Direction.Left:
        return new Coordinate(currentCoordinate.x - 1, currentCoordinate.y);
      case Direction.Right:
        return new Coordinate(currentCoordinate.x + 1, currentCoordinate.y);
    }

  }
}
