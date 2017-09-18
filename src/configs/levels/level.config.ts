import { CoordinateTile } from '../../models/coordinate-tile';

export interface LevelConfig {
  backgroundCoordTiles: Array<CoordinateTile>;
  trafficCoordTiles: Array<CoordinateTile>;
}
