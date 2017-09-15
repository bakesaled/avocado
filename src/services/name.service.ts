export class NameService {
  private usedPlayerNames: Set<string>;
  constructor() {
    this.usedPlayerNames = new Set();
  }
  public getPlayerName(): string {
    let name: string;
    do {
      name = this.generateName();
    } while (this.usedPlayerNames.has(name));

    this.usedPlayerNames.add(name);
    return name;
  }

  private generateName(): string {
    return `Player ${this.getRandomNumber()}`;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }
}
