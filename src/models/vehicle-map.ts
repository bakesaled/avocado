import { Vehicle } from './vehicle';

export class VehicleMap {
  private vehicles: Map<number, Vehicle>;

  constructor() {
    this.vehicles = new Map();
  }

  public reinitialize() {
    this.vehicles.clear();
  }

  public addVehicle(vehicle: Vehicle) {
    this.vehicles.set(vehicle.id, vehicle);
  }

  public getVehicle(vehicleId: number) {
    return this.vehicles.get(vehicleId);
  }

  public getVehicles() {
    return this.vehicles.values();
  }

  public removeVehicle(vehicleId: number) {
    this.vehicles.delete(vehicleId);
  }

  public toJSON() {
    const results: Array<Vehicle> = [];
    this.vehicles.forEach(vehicle => {
      results.push(vehicle);
    });

    return results;
  }
}
