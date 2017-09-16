export class Tile {
  constructor(
    private strId: number = 0,
    private ltId: number = 0,
    private vehId: number = 0,
    private sigId: number = 0
  ) {}

  public get streetId() {
    return this.strId;
  }
  public set streetId(id: number) {
    this.strId = id;
  }

  public get lotId() {
    return this.ltId;
  }
  public set lotId(id: number) {
    this.ltId = id;
  }

  public get vehicleId() {
    return this.vehId;
  }
  public set vehicleId(id: number) {
    this.vehId = id;
  }

  public get signalId() {
    return this.sigId;
  }
  public set signalId(id: number) {
    this.sigId = id;
  }
}
