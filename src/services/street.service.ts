import { StreetMap } from '../models/street-map';
import { BoardService } from './board.service';
import { NameService } from './name.service';
import { Level1Config } from '../configs/levels/level1.config';
import { Street } from '../models/street';

export class StreetService {
  constructor(
    private streetMap: StreetMap,
    private boardService: BoardService,
    private nameService: NameService
  ) { }

  public generateStreets(levelConfig: Level1Config) {
    for (let i = 0; i < levelConfig.streets.length; i++) {
      const street = levelConfig.streets[i];
      this.addStreet(street)
    }
  }

  private addStreet(street: Street) {
    const streetId = this.nameService.getStreetId();
    street.id = streetId;

    this.boardService.addStreetOccupancy(street);
    this.streetMap.addStreet(street);
  }
}
