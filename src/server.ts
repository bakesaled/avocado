import { Application } from 'express';
import * as express from 'express';
let http = require('http');
import { Server } from 'http';
import * as socketIO from 'socket.io';
import { VehicleSignal } from './state-machines/vehicle-signal';
import { SignalClient } from './interfaces/signal-client.interface';

export class AppServer {
  private vehicleSignal: VehicleSignal;

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

    this.vehicleSignal = new VehicleSignal();

    this.httpServer.listen(3000, () => {
      console.log('listening on *:3000');

      let signal1: SignalClient = {
        location: 'Main & Fake', direction: 'north-south'
      };let signal2: SignalClient = {
        location: 'Main & Fake', direction: 'east-west'
      };
      this.vehicleSignal.on("transition", function (data: any){
        // console.log("we just transitioned from " + data.fromState + " to " + data.toState);
      });
      this.vehicleSignal.handle(signal1,'red');
      this.vehicleSignal.handle(signal2,'pedestrianWaiting');
    });
  }
}
