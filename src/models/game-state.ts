import { CoordinateTile } from './coordinate-tile';
import { Vehicle } from './vehicle';
import { Street } from './street';

export class GameState {
  constructor(
    public streets: Array<Street>,
    public trafficTiles: Array<CoordinateTile>,
    public vehicles: Array<Vehicle>
  ) {}
}
