export class GameController {
  constructor() {
    // this.runGameCycle();
  }

  public listen(io: SocketIO.Server) {
    console.log('game controller is listening...');

    io.sockets.on('connection', (socket) => {
      socket.on('new player', (name, image) => {
        console.log('new player added:', name);
this.runGameCycle();
      });
    });
  }

  private runGameCycle() {
    console.log('game cycle is running');
    setTimeout(() => {
      this.runGameCycle();
    }, 1000);
  }
}
