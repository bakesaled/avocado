import { GameState } from '../models/game-state';

export class NotificationService {
  private sockets: SocketIO.Namespace;
  constructor() {

  }

  public init(sockets: SocketIO.Namespace) {
    this.sockets = sockets;
  }

  public notifyGameState(gameState: GameState) {
    // const playerSocket = this.sockets.connected[playerId];
    // if (playerSocket) {
    // console.log('notifyGameState');
      this.sockets.emit('new game state', gameState);
    // }
  }
}
