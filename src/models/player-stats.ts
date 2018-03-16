export class PlayerStats {
  constructor(
    public name: string,
    public population: number = 0,
    public cash: number = 0
  ) {}

  public increasePopulation(amount: number) {
    this.population += amount;
  }

  public decreasePopulation(amount: number) {
    this.population -= amount;
  }

  public addCash(amount: number) {
    this.cash += amount;
  }

  public removeCash(amount: number) {
    this.cash -= amount;
  }
}
