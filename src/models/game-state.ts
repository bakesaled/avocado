import { CoordinateTile } from './coordinate-tile';
import { Vehicle } from './vehicle';
import { Street } from './street';
import { PlayerStats } from './player-stats';

export class GameState {
  constructor(
    public streets: Array<Street>,
    public trafficTiles: Array<CoordinateTile>,
    public vehicles: Array<Vehicle>,
    public playerStats: PlayerStats,
    public statBoard: Array<PlayerStats>
  ) {}
}
