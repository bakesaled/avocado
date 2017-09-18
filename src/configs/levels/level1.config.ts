import { Tile } from '../../models/tile';
import { Coordinate } from '../../models/coordinate';
import { CoordinateTile } from '../../models/coordinate-tile';
import { LevelConfig } from './level.config';

export class Level1Config implements LevelConfig {
  public backgroundCoordTiles: Array<CoordinateTile> = [
    new CoordinateTile(new Coordinate(5, 0), new Tile(1)),
    new CoordinateTile(new Coordinate(5, 1), new Tile(1))
  ];

  public trafficCoordTiles: Array<CoordinateTile> = [

  ];
}
