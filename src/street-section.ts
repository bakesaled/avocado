import { Intersection } from './state-machines/intersection';

export class StreetSection {
  public name: string;
  public distance: number;
  public speedLimit: number;
  public direction: string;
  public laneCount: number;
  public startIntersection: Intersection;
  public endIntersection: Intersection;
}
