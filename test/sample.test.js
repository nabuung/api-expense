import * as Lab from '@hapi/lab'
import { expect } from '@hapi/code'
import { init } from '../lib/server.js';

const lab = Lab.script()
const { afterEach, beforeEach, describe, it } = lab;
export { lab }

describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('Create new expenses', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

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