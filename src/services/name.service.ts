export class NameService {
  private usedPlayerNames: Set<string>;
  private usedVehicleIds: Set<number>;
  constructor() {
    this.usedPlayerNames = new Set();
    this.usedVehicleIds = new Set();
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

  private generateName(): string {
    return `Player ${this.getRandomNumber()}`;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }
}
