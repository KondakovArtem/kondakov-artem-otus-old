import  { init as serverInit } from "../src/server.mjs";
import chai from 'chai';
import { Server } from 'http';
const expect = chai.expect;

describe('Server', () => {
    it('should create server',  async () => {
        const server = await serverInit();
        expect(server).to.be.an.instanceof(Server);
        server.close();
    });
});
