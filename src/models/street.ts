import { Direction } from './direction';
import { Coordinate } from './coordinate';

export class Street {
  public id: number;
  constructor(
    public direction: Direction,
    public coordinate: Coordinate
  ) {}
}
