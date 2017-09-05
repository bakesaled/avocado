import { Application } from 'express';
import * as express from 'express';
let http = require('http');
import { Server } from 'http';
import * as socketIO from 'socket.io';
import { Intersection } from './state-machines/intersection';

export class AppServer {
  private intersection: Intersection;

  public app: Application;
  public httpServer: Server;
  public io: SocketIO.Server;


  public static bootstrap(): AppServer {
    return new AppServer();
  }

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app); // new Server(this.app);
    this.io = socketIO.listen(this.httpServer);

    this.init();
  }

  private init() {
    this.app.get('/', function(req, res){
      res.sendFile(__dirname + '/index.html');
    });

    this.io.on('connection', (socket) => {
      console.log(' a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        this.io.emit('chat message', msg);
      });
    });

    this.intersection = new Intersection('main and fake');

    this.httpServer.listen(3000, () => {

      /**TypeState**/
      this.intersection.init();
    });
  }
}
