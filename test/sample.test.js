import * as Lab from '@hapi/lab'
import { expect } from '@hapi/code'
import { init } from '../lib/server.js';

const lab = Lab.script()
const { afterEach, beforeEach, describe, it } = lab;
export { lab }

let server;
server = await init();

describe('GET /', () => {

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('Create new expenses', () => {
    
    it('with only mandatory payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/expense',
            payload: {
                title: 'Test Expense',
                amount: 1000000,
                category: 'Dining Out',
                date: '2023-06-10'
              }
        });
        expect(res.statusCode).to.equal(200);
    });
});