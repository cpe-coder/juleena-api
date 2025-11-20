import type { HonoEnv } from '@/types/hono.js';
import { makeError } from '@/utils/errors.js';
import { logger } from '@/utils/logger.js';
import type { Context } from 'hono';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function errorHandlerMiddleware(err: Error, c: Context<HonoEnv>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { error, statusCode } = makeError(err);
  logger.error(error.message, error);
  // return c.json(error, statusCode );
}
