import type { DbClient } from '@/db/create-db-client.js';
import type { CreateUser } from './schema.js';

export type CreateUserDataArgs = {
  dbClient: DbClient;
  values: CreateUser;
};

export async function createUserData({ dbClient, values }: CreateUserDataArgs) {
  const createdRecord = await dbClient
    .insertInto('users')
    .values(values)
    .returningAll()
    .executeTakeFirstOrThrow();
  return createdRecord;
}

export type CreateUserDataResponse = Awaited<ReturnType<typeof createUserData>>;
