import { AppServer } from './server';
const request = require('supertest');

describe("Server", () => {
  it('should return 200 OK', () => {
    const server = new AppServer();
    request(server.app).get('/').expect(200, function(err: any){
      console.log(err);
    });
  });
});
