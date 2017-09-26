export class NameService {
  private usedPlayerNames: Set<string>;
  private usedVehicleIds: Set<number>;
  private usedStreetIds: Set<number>;
  
  constructor() {
    this.usedPlayerNames = new Set();
    this.usedVehicleIds = new Set();
    this.usedStreetIds = new Set();
  }
  public getPlayerName(): string {
    let name: string;
    do {
      name = this.generateName();
    } while (this.usedPlayerNames.has(name));

    this.usedPlayerNames.add(name);
    return name;
  }

  public getVehicleId(): number {
    let vehicleId;
    do {
      vehicleId = this.getRandomNumber();
    } while (this.usedVehicleIds.has(vehicleId));

    this.usedVehicleIds.add(vehicleId);
    return vehicleId;
  }

  public getStreetId(): number {
    let streetId;
    do {
      streetId = this.getRandomNumber();
    } while (this.usedStreetIds.has(streetId));

    this.usedStreetIds.add(streetId);
    return streetId;
  }

  private generateName(): string {
    return `Player ${this.getRandomNumber()}`;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }
}
