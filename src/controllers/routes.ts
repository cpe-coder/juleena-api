import serverRoutes from './server/routes.js';
import usersRoutes from './users/routes.js';

export const routes = [serverRoutes, usersRoutes] as const;

export type AppRoutes = (typeof routes)[number];
