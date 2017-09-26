import { CoordinateTile } from '../../models/coordinate-tile';
import { Street } from '../../models/street';

export interface LevelConfig {
  trafficCoordTiles: Array<CoordinateTile>;
  streets: Array<Street>;
}
