import { BoardConfig } from '../configs/board.config';
import { Layer } from '../models/layer';

export class BoardService {
  public backgroundLayer: Layer;
  public trafficLayer: Layer;

  constructor() {
    this.initializeBoards();
  }

  public initializeBoards() {
    this.backgroundLayer = new Layer(BoardConfig.layers.backgroundLayer.rows, BoardConfig.layers.backgroundLayer.columns);
    this.trafficLayer = new Layer(BoardConfig.layers.trafficLayer.rows, BoardConfig.layers.trafficLayer.columns);

  }
}
