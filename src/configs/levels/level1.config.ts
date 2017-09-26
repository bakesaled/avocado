import { Coordinate } from '../../models/coordinate';
import { CoordinateTile } from '../../models/coordinate-tile';
import { LevelConfig } from './level.config';
import { Street } from '../../models/street';
import { Direction } from '../../models/direction';

export class Level1Config implements LevelConfig {

  public trafficCoordTiles: Array<CoordinateTile> = [

  ];

  public streets: Array<Street> = [
    new Street(Direction.Down, new Coordinate(5, 0)),
    new Street(Direction.Down, new Coordinate(5, 1)),
    new Street(Direction.Down, new Coordinate(5, 2)),
    new Street(Direction.Down, new Coordinate(5, 3)),
    new Street(Direction.Down, new Coordinate(5, 4)),
    new Street(Direction.Down, new Coordinate(5, 5)),
    new Street(Direction.Down, new Coordinate(5, 6)),
    new Street(Direction.Down, new Coordinate(5, 7)),
    new Street(Direction.Up, new Coordinate(6, 0)),
    new Street(Direction.Up, new Coordinate(6, 1)),
    new Street(Direction.Up, new Coordinate(6, 2)),
    new Street(Direction.Up, new Coordinate(6, 3)),
    new Street(Direction.Up, new Coordinate(6, 4)),
    new Street(Direction.Up, new Coordinate(6, 5)),
    new Street(Direction.Up, new Coordinate(6, 6)),
    new Street(Direction.Up, new Coordinate(6, 7))
  ]
}
