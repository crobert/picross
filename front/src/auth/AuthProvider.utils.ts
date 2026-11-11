import type { User } from '../api/users';

export const STORAGE_KEY = 'picross.user';

export const parseStoredUser = (raw: string | null): User | null => {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (
      typeof value === 'object' &&
      value !== null &&
      'id' in value &&
      'pseudo' in value &&
      typeof value.id === 'number' &&
      typeof value.pseudo === 'string'
    ) {
      return { id: value.id, pseudo: value.pseudo };
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
