import { VehicleService } from './vehicle.service';
import { LevelConfig } from '../configs/levels/level.config';
import { BoardService } from './board.service';
import { Level1Config } from '../configs/levels/level1.config';
import { VehicleMap } from '../models/vehicle-map';
import { NameService } from './name.service';
import { Coordinate } from '../models/coordinate';
import { Direction } from '../models/direction';

describe('VehicleService', () => {
  let levelConfig: LevelConfig;
  let boardService: BoardService;
  let vehicleMap: VehicleMap;
  let nameService: NameService;
  let vehicleService: VehicleService;

  beforeEach(() => {
    levelConfig = new Level1Config();
    boardService = new BoardService(levelConfig);
    vehicleMap = new VehicleMap();
    nameService = new NameService();
    vehicleService = new VehicleService(vehicleMap, boardService, nameService);
  });

  it('should add vehicle', () => {
    const vehicle = vehicleService.addVehicle(1);
    expect(vehicle.id).toBe(1);
    expect(vehicleMap.getVehicle(1)).toBe(vehicle);
    expect(vehicleMap.toJSON().length).toBe(1);
  });

  it('should remove vehicle if moved out of bounds', () => {
    const vehicle = vehicleService.addVehicle(2);
    vehicle.move(new Coordinate(0,0));
    vehicle.changeDirection(Direction.Up);
    vehicleService.moveVehicles();

    expect(vehicleMap.getVehicle(2)).toBeUndefined();
  });

  it('should not remove or move vehicle if move attempted off of street', () => {
    const vehicle = vehicleService.addVehicle(3);
    const coords = new Coordinate(5,0);
    vehicle.move(coords);
    vehicle.changeDirection(Direction.Right);
    vehicleService.moveVehicles();

    expect(vehicle.currentCoordinate.x).toBe(coords.x);
    expect(vehicle.currentCoordinate.y).toBe(coords.y);
    expect(vehicleMap.getVehicle(3)).toBeDefined();
  });

  it('should move vehicle if allowed', () => {
    const vehicle = vehicleService.addVehicle(4);
    const coords = new Coordinate(5,0);
    vehicle.move(coords);
    vehicle.changeDirection(Direction.Down);
    vehicleService.moveVehicles();

    expect(vehicle.currentCoordinate.x).toBe(coords.x);
    expect(vehicle.currentCoordinate.y).toBe(coords.y + 1);
    expect(vehicleMap.getVehicle(4)).toBeDefined();
  });
});
