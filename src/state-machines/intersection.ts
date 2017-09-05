import { VehicleSignal } from './vehicle-signal';
import { VehicleSignalState } from '../enums/vehicle-signal-state.enum';

export class Intersection {
  public vehicleEastWest: VehicleSignal;
  public vehicleNorthSouth: VehicleSignal;

  constructor(id: string) {
    this.vehicleEastWest = new VehicleSignal(id + '-ew');
    this.vehicleNorthSouth = new VehicleSignal(id + '-ns');
  }

  public init() {
    this.vehicleEastWest.init(VehicleSignalState.Red);
    this.vehicleNorthSouth.init(VehicleSignalState.Green);
  }
}
