const fastify = require('fastify')({ logger: true });
const fastifyHttpProxy = require('fastify-http-proxy');
const fastifySwagger = require('fastify-swagger');
const fastifyCors = require('fastify-cors');
const PORT = 9094;
const dotenv = require('dotenv');

dotenv.config();

//setup a proxy to github, inject the authoorization header
fastify.register(fastifyHttpProxy, {
  upstream: 'https://api.github.com',
  prefix: 'github',
  replyOptions: {
    rewriteRequestHeaders: (origReq, headers) => {
      return {
        ...headers,
        authorization: `${process.env.GITHUB_ACCESS_TOKEN}`, //`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`,
      };
    },
  },
});

//setup CORS
fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
});

//register the swagger middleware, listen on /docs
fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Project Release 2',
      description: 'The swagger API',
      version: '0.1.0',
    },
    host: 'localhost:5000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

const start = async () => {
  try {
    await fastify.listen(PORT, '0.0.0.0');
    console.log(`Listening on port: `);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
