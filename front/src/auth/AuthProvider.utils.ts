import type { Role, User } from '../api/users';

export const STORAGE_KEY = 'picross.user';

const isRole = (value: unknown): value is Role =>
  value === 'ROLE_ADMIN' || value === 'ROLE_PLAYER';

export const isAdmin = (user: User): boolean => user.role === 'ROLE_ADMIN';

export const parseStoredUser = (raw: string | null): User | null => {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (
      typeof value === 'object' &&
      value !== null &&
      'id' in value &&
      'pseudo' in value &&
      'role' in value &&
      typeof value.id === 'number' &&
      typeof value.pseudo === 'string' &&
      isRole(value.role)
    ) {
      return { id: value.id, pseudo: value.pseudo, role: value.role };
    }
  } catch {
    return null;
  }
  return null;
};

export const readStoredUser = (): User | null => {
  try {
    return parseStoredUser(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
};

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    return;
  }
};

export const clearUser = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
};
