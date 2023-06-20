'use strict';
import Hapi from '@hapi/hapi'
import Joi from 'joi';

// Import handler
import { postExpense } from '../handlers/postExpense.js';

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: function () {

      return 'Hello World!';
  }
});

// Route to create new expense
server.route({
    method: 'POST',
    path: '/expense',
    handler: postExpense,
    options: {
        validate: {
            payload: Joi.object({
                title: Joi.string().min(1).max(140),
                date: Joi.date().required(),
                category: Joi.string().required(),
                subcategory: Joi.string(),
                amount: Joi.number().required()
            })
        }
    }
})

export const init = async () => {

    await server.initialize();
    return server;
};

export const start = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
