import { CoordinateService } from './coordinate.service';
import { Coordinate } from '../models/coordinate';
import { Direction } from '../models/direction';
import { Vehicle } from '../models/vehicle';

describe('NameService', () => {
  describe('NextCoordinate', () => {
    it('should get coordinate above when direction is up', () => {
      const coord = new Coordinate(1,2);
      const nextCoord = CoordinateService.getNextCoordinate(coord, Direction.Up);

      expect(nextCoord.x).toBe(1);
      expect(nextCoord.y).toBe(1);
    });
    it('should get coordinate below when direction is down', () => {
      const coord = new Coordinate(1,2);
      const nextCoord = CoordinateService.getNextCoordinate(coord, Direction.Down);

      expect(nextCoord.x).toBe(1);
      expect(nextCoord.y).toBe(3);
    });
    it('should get coordinate to the left when direction is left', () => {
      const coord = new Coordinate(1,2);
      const nextCoord = CoordinateService.getNextCoordinate(coord, Direction.Left);

      expect(nextCoord.x).toBe(0);
      expect(nextCoord.y).toBe(2);
    });
    it('should get coordinate to the right when direction is right', () => {
      const coord = new Coordinate(1,2);
      const nextCoord = CoordinateService.getNextCoordinate(coord, Direction.Right);

      expect(nextCoord.x).toBe(2);
      expect(nextCoord.y).toBe(2);
    });
  });

  describe('MoveVehicle', () => {
    it('should move to correct coordinate based on direction', () => {
      const vehicle = new Vehicle(1);
      const coord = new Coordinate(2,4);
      vehicle.move(coord);
      vehicle.changeDirection(Direction.Down);

      CoordinateService.moveVehicle(vehicle);
      expect(vehicle.currentCoordinate.x).toBe(coord.x);
      expect(vehicle.currentCoordinate.y).toBe(coord.y + 1);
    })
  })
});

