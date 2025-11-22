import type { User } from '@/db/schema';
import { UserRoleType } from '@/db/types';
import { emailSchema } from '@/utils/zod-schemas';
import { z } from '@hono/zod-openapi';

export const userSchemaObject = {
  id: z.string().uuid(),
  created_at: z.union([z.coerce.date(), z.string()]).openapi({
    example: new Date().toISOString(),
  }),
  updated_at: z.union([z.coerce.date(), z.string()]).openapi({
    example: new Date().toISOString(),
  }),
  deleted_at: z.union([z.coerce.date(), z.string()]).nullable().openapi({
    example: null,
  }),
  last_login_at: z.union([z.coerce.date(), z.string()]).nullable().openapi({
    example: null,
  }),
  email_verified_at: z.union([z.coerce.date(), z.string()]).nullable().openapi({
    example: null,
  }),
  email: emailSchema.openapi({
    example: 'johndoe@gmail.com',
  }),
  password_hash: z.string().min(1).openapi({
    example: '$2a$12$yTQo4XF4faeQdFg8gQBy0eYhqn/ZfZJ9OYRZK10h62Gzjsr9pdRyK',
  }),
  first_name: z.string().nullable().openapi({
    example: 'JOHN',
  }),
  last_name: z.string().nullable().openapi({
    example: 'DOE',
  }),
  role: z.nativeEnum(UserRoleType).openapi({
    example: UserRoleType.USER,
  }),
};

export const userSchema = z.object(userSchemaObject) satisfies z.ZodType<User>;
export const userSchemaOpenApi = userSchema.openapi('User');
export const userSchemaFields = z.enum(Object.keys(userSchemaObject) as [string, ...string[]]);

export type CreateUser = Omit<User, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
export type UpdateUser = Partial<User>;
