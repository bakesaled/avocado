import { Board } from '../models/board';
import { BoardConfig } from '../configs/board.config';

export class BoardService {
  public backgroundBoard: Board;
  public trafficBoard: Board;

  constructor() {
    this.initializeBoards();
  }

  public initializeBoards() {
    this.backgroundBoard = new Board(BoardConfig.boards.backgroundBoard.rows, BoardConfig.boards.backgroundBoard.columns);
    this.trafficBoard = new Board(BoardConfig.boards.trafficBoard.rows, BoardConfig.boards.trafficBoard.columns);

  }
}
