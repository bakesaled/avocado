import { Tile } from '../../models/tile';
import { Coordinate } from '../../models/coordinate';
import { CoordinateTile } from '../../models/coordinate-tile';
import { LevelConfig } from './level.config';

export class Level1Config implements LevelConfig {
  public backgroundCoordTiles: Array<CoordinateTile> = [
    new CoordinateTile(new Coordinate(5, 0), new Tile(1)),
    new CoordinateTile(new Coordinate(6, 0), new Tile(1)),
    new CoordinateTile(new Coordinate(5, 1), new Tile(1)),
    new CoordinateTile(new Coordinate(6, 1), new Tile(1)),
    new CoordinateTile(new Coordinate(5, 2), new Tile(1)),
    new CoordinateTile(new Coordinate(6, 2), new Tile(1)),
    new CoordinateTile(new Coordinate(5, 3), new Tile(1)),
    new CoordinateTile(new Coordinate(6, 3), new Tile(1)),
    new CoordinateTile(new Coordinate(5, 4), new Tile(1)),
    new CoordinateTile(new Coordinate(6, 4), new Tile(1)),
    new CoordinateTile(new Coordinate(5, 5), new Tile(1)),
    new CoordinateTile(new Coordinate(6, 5), new Tile(1)),
    new CoordinateTile(new Coordinate(5, 6), new Tile(1)),
    new CoordinateTile(new Coordinate(6, 6), new Tile(1)),
    new CoordinateTile(new Coordinate(5, 7), new Tile(1)),
    new CoordinateTile(new Coordinate(6, 7), new Tile(1))
  ];

  public trafficCoordTiles: Array<CoordinateTile> = [

  ];
}
