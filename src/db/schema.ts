import type { DB, UserRoleType, users } from './types.js';

type OverrideCommonFields<TTable> = Omit<
  TTable,
  'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'last_login_at' | 'email_verified_at'
> & {
  id: string;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
  last_login_at?: Date | string | null;
  email_verified_at?: Date | string | null;
};

type OverrideUsers = Omit<OverrideCommonFields<users>, 'role'> & {
  role: UserRoleType;
};

export const FEATURE_FLAG_SCOPES = ['users:read:*', 'users:write:*', 'users:write:create'] as const;

export type User = OverrideUsers;

export type KyselySchema = DB;
