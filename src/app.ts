import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from 'hono/logger';
import { STAGES } from './constants/env.js';
import { routes } from './controllers/routes.js';
import { schemas } from './data/schema.js';
import { envConfig } from './env.js';
// import { errorHandlerMiddleware } from './middlewares/error-handler.js';
import { setUpDbClientMiddleware } from './middlewares/set-up-db-client.js';
import type { HonoEnv } from './types/hono.js';

const app = new OpenAPIHono<HonoEnv>();

if (envConfig.STAGE !== STAGES.Prod) {
  /* API Docs */
  app.get('/openapi.json', c => {
    const doc = app.getOpenAPIDocument({
      openapi: '3.0.0',
      info: {
        version: '0.0.1',
        title: `${envConfig.STAGE.toUpperCase()} API`,
        description: 'API Documentation',
      },
      externalDocs: {
        description: 'API Reference',
        url: '/reference',
      },
    });

    return c.json(doc);
  });
  app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  /* Register Schemas */
  Object.entries(schemas).forEach(([key, value]) => {
    app.openAPIRegistry.register(key, value);
  });

  /* API Docs */
  app.get('/swagger', swaggerUI({ url: '/openapi.json' }));
}

/* Global Middlewares */
// app.onError(errorHandlerMiddleware);
app.use(logger());
app.use(setUpDbClientMiddleware);

/* Routes */
routes.forEach(route => {
  app.route('/', route);
});

export default app;
