import { Layer } from './layer';

export class Board {
  constructor(public backgroundLayer: Layer, public trafficLayer: Layer) {
    // this.configureLayerLevel(this.levelConfig.backgroundCoordTiles, backgroundLayer);
    // this.configureLayerLevel(this.levelConfig.trafficCoordTiles, trafficLayer);
  }

  // private configureLayerLevel(coordTiles: Array<CoordinateTile>, layer: Layer) {
  //   for (let i = 0; i < coordTiles.length; i++) {
  //     const coordTile = coordTiles[i];
  //     const x = coordTile.coordinate.x;
  //     const y = coordTile.coordinate.y;
  //     layer.coordinateTiles[x][y] = coordTile;
  //   }
  // }
}
