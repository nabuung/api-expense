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