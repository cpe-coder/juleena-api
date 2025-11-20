import type { HonoEnv } from '@/types/hono.js';
import { OpenAPIHono } from '@hono/zod-openapi';
import { createUserRoute, createUserRouteHandler } from './create-user.js';

const usersRoutes = new OpenAPIHono<HonoEnv>().openapi(createUserRoute, createUserRouteHandler);

export default usersRoutes;
