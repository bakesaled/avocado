import { Application } from 'express';
import * as express from 'express';

export class Server {
  public app: Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();

    this.init();
  }

  private init() {
    this.app.get('/', function(req, res){
      res.send('<h1>Hello world</h1>');
    });

    this.app.listen(3000, () => {
      console.log('listening on *:3000');
    });
  }
}
