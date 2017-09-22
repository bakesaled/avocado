import { Vehicle } from '../models/vehicle';
import { BoardService } from './board.service';
import { Direction } from '../models/direction';
import { Coordinate } from '../models/coordinate';

export class VehicleSpawnService {
  constructor(private boardService: BoardService) {

  }
  public spawnNew(vehicle: Vehicle) {
    // TODO: Calculate random coordinates
    let newDirection: Direction;
    let spawnCoordinate: Coordinate = this.boardService.getRandomUnoccupiedTrafficCoordinate();

    if (spawnCoordinate === null) {
      console.log('no spawn coordinate');
      return;
    }
    const randomValue = Math.random();
    if (randomValue < 0.25) {
      newDirection = Direction.Up;
    } else if (randomValue < 0.5) {
      newDirection = Direction.Down;
    } else if (randomValue < 0.75) {
      newDirection = Direction.Left;
    } else {
      newDirection = Direction.Right;
    }
console.log('spawn coordinate', spawnCoordinate);
    vehicle.setStartingSpawn(newDirection, spawnCoordinate);
    this.boardService.addVehicleOccupancy(vehicle);
  }
}
