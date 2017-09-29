export class PlayerStats {
  constructor(
    public name: string,
    public population: number = 0
  ) {}

  public increasePopulation(amount: number) {
    this.population += amount;
  }

  public decreasePopulation(amount: number) {
    this.population -= amount;
  }
}
