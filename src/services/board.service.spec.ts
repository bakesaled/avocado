
import { BoardService } from './board.service';
import { Level1Config } from '../configs/levels/level1.config';
import { Coordinate } from '../models/coordinate';
import { LevelConfig } from '../configs/levels/level.config';
import { Vehicle } from '../models/vehicle';
import { Direction } from '../models/direction';

describe('BoardService', () => {
  let levelConfig: LevelConfig;
  let boardService: BoardService;
  beforeEach(() => {
    levelConfig = new Level1Config();
    boardService = new BoardService(levelConfig);
  });

  it('should determine if coordinate is a street', () => {
    const emptyCoord = new Coordinate(1,1);
    expect(boardService.isStreet(emptyCoord)).toBeFalsy();

    const streetCoord = new Coordinate(5,0);
    expect(boardService.isStreet(streetCoord)).toBeTruthy();
  });

  it('should determine if coordinate is out of bounds', () => {
    const inBoundCoord = new Coordinate(2,3);
    expect(boardService.isOutOfBounds(inBoundCoord)).toBeFalsy();

    const outBoundCoord = new Coordinate(200,300);
    expect(boardService.isOutOfBounds(outBoundCoord)).toBeTruthy();

    const outBoundNegativeCoord = new Coordinate(-1,3);
    expect(boardService.isOutOfBounds(outBoundNegativeCoord)).toBeTruthy();
  });

  it('should get unoccupied coordinate', () => {
    const numberOfAttempts = 10;
    let coord: Coordinate;
    for (let i = 0; i < numberOfAttempts; i++) {
      coord = boardService.getRandomUnoccupiedTrafficCoordinate();
      expect(coord.x).toBe(5);
      expect(coord.y === 0 || coord.y === 1).toBeTruthy();
    }
  });

  it('should add vehicle to board', () => {
    const coord = new Coordinate(2,3);
    const vehicle = new Vehicle(1);
    vehicle.move(coord);
    vehicle.changeDirection(Direction.Right);

    boardService.addVehicleOccupancy(vehicle);
    expect(boardService.isOccupied(vehicle.currentCoordinate)).toBeTruthy();
  });

  it('should remove vehicle from board', () => {
    const coord = new Coordinate(4,5);
    const vehicle = new Vehicle(1);
    vehicle.move(coord);
    vehicle.changeDirection(Direction.Right);

    boardService.addVehicleOccupancy(vehicle);
    boardService.removeVehicleOccupancy(vehicle);
    expect(boardService.isOccupied(vehicle.currentCoordinate)).toBeFalsy();
  });
});
