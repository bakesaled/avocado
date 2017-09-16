import { Tile } from './tile';

export class Board {
  private tiles: Array<Array<Tile>>;

  constructor(public height: number, public width: number) {
    this.initialize();
  }

  public initialize() {
    this.tiles = new Array(this.height);

    for (let i = 0; i < this.height; i++) {
      this.tiles[i] = new Array(this.width);
      for (let j = 0; j < this.width; j++) {
        this.tiles[i][j] = new Tile();
      }
    }
  }
}
