import { request, SERIAL_MODE, PARALLEL_MODE }  from '../src/request.mjs';
import  { init as serverInit } from "../src/server.mjs";
import chai from 'chai';
const expect = chai.expect;

describe('Request', () => {

    let server;
    before(async () => {
        console.log('opening server');
        server = await serverInit();
    });

    after(() => {
        console.log('closing server');
        server.close();
    });

    it('should receive 10 response with serial mode',  async () => {
        const response = await request(10, SERIAL_MODE);
        expect(response).to.have.lengthOf(10);
    });

    it('should receive 10 response with parallel mode',  async () => {
        const response = await request(10, PARALLEL_MODE);
        expect(response).to.have.lengthOf(10);
    })

});
