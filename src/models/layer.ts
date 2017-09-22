import { CoordinateTile } from './coordinate-tile';
import { Coordinate } from './coordinate';
import { Tile } from './tile';

export class Layer {
  private coordTiles: Array<Array<CoordinateTile>>;

  constructor(public height: number, public width: number) {
    this.initialize();
  }

  public get coordinateTiles() {
    return this.coordTiles;
  }

  public initialize() {
    this.coordTiles = new Array(this.width);

    for (let column = 0; column < this.width; column++) {
      this.coordTiles[column] = new Array(this.height);
      for (let row = 0; row < this.height; row++) {
        this.coordTiles[column][row] = new CoordinateTile(
          new Coordinate(column, row), new Tile()
        );
      }
    }
  }
}
