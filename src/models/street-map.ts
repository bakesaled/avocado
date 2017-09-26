import { Street } from './street';

export class StreetMap {
  private streets: Map<number, Street>;

  constructor() {
    this.streets = new Map();
  }

  public reinitialize() {
    this.streets.clear();
  }

  public addStreet(street: Street) {
    this.streets.set(street.id, street);
  }

  public getStreet(streetId: number) {
    return this.streets.get(streetId);
  }

  public getStreets() {
    return this.streets.values();
  }

  public removeStreet(streetId: number) {
    this.streets.delete(streetId);
  }

  public toJSON() {
    const results: Array<Street> = [];
    this.streets.forEach(street => {
      results.push(street);
    });

    return results;
  }
}

