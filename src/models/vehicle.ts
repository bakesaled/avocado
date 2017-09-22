import { Coordinate } from './coordinate';
import { Direction } from './direction';

export class Vehicle {
  private direction: Direction;
  private coordinate: Coordinate;

  constructor(
    public id: number,
  ) {}

  public changeDirection(newDirection: Direction) {
    this.direction = newDirection;
  }

  public move(newCoordinate: Coordinate) {
    this.coordinate = newCoordinate;
  }

  public get currentCoordinate() {
    return this.coordinate;
  }

  public get currentDirection() {
    return this.direction;
  }

  public setStartingSpawn(newDirection: Direction, newCoordinate: Coordinate) {
    this.direction = newDirection;
    this.coordinate = newCoordinate;
  }
}
