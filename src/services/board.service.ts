import { BoardConfig } from '../configs/board.config';
import { Layer } from '../models/layer';
import { Vehicle } from '../models/vehicle';
import { CoordinateTile } from '../models/coordinate-tile';
import { Coordinate } from '../models/coordinate';
import { Board } from '../models/board';
import { Street } from '../models/street';

export class BoardService {
  public board: Board;
  // public backgroundLayer: Layer;
  // public trafficLayer: Layer;

  constructor() {
    this.initializeBoards();
  }

  public initializeBoards() {
    this.board = new Board(
      new Layer(BoardConfig.layers.backgroundLayer.rows, BoardConfig.layers.backgroundLayer.columns),
      new Layer(BoardConfig.layers.trafficLayer.rows, BoardConfig.layers.trafficLayer.columns),
    );
  }

  public addVehicleOccupancy(vehicle: Vehicle) {
    const coordinateTile: CoordinateTile = this.board.trafficLayer.coordinateTiles[vehicle.currentCoordinate.x][vehicle.currentCoordinate.y];
    coordinateTile.setVehicleTile(vehicle);
  }

  public removeVehicleOccupancy(vehicle: Vehicle) {
    const coordinateTile: CoordinateTile = this.board.trafficLayer.coordinateTiles[vehicle.currentCoordinate.x][vehicle.currentCoordinate.y];
    coordinateTile.clearVehicleTile();
  }

  public getRandomUnoccupiedTrafficCoordinate() {
    const unoccupedCoordinates: Array<Coordinate> = [];
    for (let column = 0; column < this.board.backgroundLayer.width; column++) {
      for (let row = 0; row < this.board.backgroundLayer.height; row++) {
        const backgroundCoordTile = this.board.backgroundLayer.coordinateTiles[column][row];
        const trafficCoordTile = this.board.trafficLayer.coordinateTiles[column][row];

        if (backgroundCoordTile.isStreet() && !trafficCoordTile.isOccupied()) {
          unoccupedCoordinates.push(new Coordinate(column, row));
        }
      }
    }
    if (unoccupedCoordinates.length === 0) {
      return null;
    }
    return unoccupedCoordinates[Math.floor(Math.random() * unoccupedCoordinates.length)];
  }

  public addStreetOccupancy(street: Street) {
    const coordinateTile: CoordinateTile = this.board.backgroundLayer.coordinateTiles[street.coordinate.x][street.coordinate.y];
    coordinateTile.setStreetTile(street);
  }

  public isOutOfBounds(coordinate: Coordinate) {
    return coordinate.x < 0 || coordinate.x > this.board.backgroundLayer.width || coordinate.y < 0 || coordinate.y > this.board.backgroundLayer.height;
  }

  public isStreet(coordinate: Coordinate) {
    return this.board.backgroundLayer.coordinateTiles[coordinate.x][coordinate.y].isStreet();
  }

  public isOccupied(coordinate: Coordinate) {
    return this.board.trafficLayer.coordinateTiles[coordinate.x][coordinate.y].isOccupied();
  }

  public getStreetId(coordinate: Coordinate): number {
    return this.board.backgroundLayer.coordinateTiles[coordinate.x][coordinate.y].tile.streetId;
  }
}
