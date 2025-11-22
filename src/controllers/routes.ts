import serverRoutes from './server/routes';
import usersRoutes from './users/routes';

export const routes = [serverRoutes, usersRoutes] as const;

export type AppRoutes = (typeof routes)[number];
