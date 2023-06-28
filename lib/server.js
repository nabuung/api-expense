'use strict';
import Hapi from '@hapi/hapi'
import Joi from 'joi';
import Inert from "@hapi/inert"
import Vision from "@hapi/vision"
import HapiSwagger from "hapi-swagger"

// Import handler
import { postExpense } from '../handlers/postExpense.js';

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const swaggerOptions = {
    info: {
            title: 'Test API Documentation',
            version: process.env.npm_package_version,
        },
    };

await server.register([
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
]);

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
        tags: ['api'],
        validate: {
            payload: Joi.object({
                title: Joi.string().min(1).max(140),
                date: Joi.date().required(),
                category: Joi.string().required(),
                subcategory: Joi.string(),
                amount: Joi.number().required(),
                account: Joi.string(),
                payee: Joi.string()
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
    //console.log(process.env)
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
