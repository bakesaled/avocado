export class GameController {
  constructor() {
    this.runGameCycle();
  }

  public listen(io: SocketIO.Server) {
    console.log('game controller is listening...');
  }

  private runGameCycle() {
    console.log('game cycle is running');
    setTimeout(() => {
      this.runGameCycle();
    }, 1000);
  }
}
