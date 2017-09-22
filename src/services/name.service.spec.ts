import { NameService } from './name.service';

describe("NameService", () => {
  const numberOfNamesToTest = 500;

  it('should generate a new unused player name', done => {
    const nameService = new NameService();
    const usedNames = new Set();
    for (let i = 0; i < numberOfNamesToTest; i++) {
      usedNames.add(nameService.getPlayerName());
    }
    expect(usedNames.size).toBe(numberOfNamesToTest);

    done();
  });
});
