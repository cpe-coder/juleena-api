import type { HonoEnv } from '@/types/hono.js';
import { OpenAPIHono } from '@hono/zod-openapi';
import { getServerDateTimeRoute, getServerDateTimeRouteHandler } from './get-server-date-time.js';

const serverRoutes = new OpenAPIHono<HonoEnv>().openapi(
  getServerDateTimeRoute,
  getServerDateTimeRouteHandler
);

export default serverRoutes;
