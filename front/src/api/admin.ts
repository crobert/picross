import { UnknownUserError } from './errors';
import type { Role } from './users';

export type AdminUser = {
  id: number;
  pseudo: string;
  role: Role;
  createdAt: string;
  completedCount: number;
};

export const fetchAdminUsers = async (
  userId: number,
  signal?: AbortSignal,
): Promise<AdminUser[]> => {
  const response = await fetch('/api/admin/users', {
    headers: { 'X-User-Id': String(userId) },
    signal,
  });
  if (response.status === 404) throw new UnknownUserError();
  if (!response.ok) {
    throw new Error(
      `GET /api/admin/users failed with status ${response.status}`,
    );
  }
  return response.json();
};
