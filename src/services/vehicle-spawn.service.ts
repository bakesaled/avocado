import { Vehicle } from '../models/vehicle';
import { BoardService } from './board.service';
import { Direction } from '../models/direction';
import { Coordinate } from '../models/coordinate';
import { StreetMap } from '../models/street-map';

export class VehicleSpawnService {
  constructor(
    private boardService: BoardService,
    private streetMap: StreetMap
  ) {

  }
  public spawnNew(vehicle: Vehicle) {
    // TODO: Calculate random coordinates
    let spawnCoordinate: Coordinate = this.boardService.getRandomUnoccupiedTrafficCoordinate();


    if (spawnCoordinate === null) {
      return;
    }

    let streetId = this.boardService.getStreetId(spawnCoordinate);
    let newDirection: Direction = this.streetMap.getStreet(streetId).direction;
    // const randomValue = Math.random();
    // if (randomValue < 0.25) {
    //   newDirection = Direction.Up;
    // } else if (randomValue < 0.5) {
    //   newDirection = Direction.Down;
    // } else if (randomValue < 0.75) {
    //   newDirection = Direction.Left;
    // } else {
    //   newDirection = Direction.Right;
    // }
    vehicle.setStartingSpawn(newDirection, spawnCoordinate);
    this.boardService.addVehicleOccupancy(vehicle);
  }
}
