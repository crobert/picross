import type { User } from '../api/users';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  clearUser,
  isAdmin,
  parseStoredUser,
  readStoredUser,
  saveUser,
  STORAGE_KEY,
} from './AuthProvider.utils';

const alice: User = { id: 1, pseudo: 'alice', role: 'ROLE_PLAYER' };

const stubStorage = () => {
  const store = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
  });
  return store;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('parseStoredUser', () => {
  it('returns the stored user', () => {
    expect(
      parseStoredUser('{"id":3,"pseudo":"alice","role":"ROLE_ADMIN"}'),
    ).toEqual({ id: 3, pseudo: 'alice', role: 'ROLE_ADMIN' });
  });

  it('keeps only the id, the pseudo and the role', () => {
    expect(
      parseStoredUser('{"id":3,"pseudo":"alice","role":"ROLE_PLAYER","x":1}'),
    ).toEqual({ id: 3, pseudo: 'alice', role: 'ROLE_PLAYER' });
  });

  it('returns null for a user stored without a known role', () => {
    expect(parseStoredUser('{"id":3,"pseudo":"alice"}')).toBeNull();
    expect(
      parseStoredUser('{"id":3,"pseudo":"alice","role":"ROLE_ROOT"}'),
    ).toBeNull();
  });

  it('returns null for missing, malformed or incomplete data', () => {
    expect(parseStoredUser(null)).toBeNull();
    expect(parseStoredUser('')).toBeNull();
    expect(parseStoredUser('not json')).toBeNull();
    expect(
      parseStoredUser('{"id":"3","pseudo":"alice","role":"ROLE_PLAYER"}'),
    ).toBeNull();
    expect(parseStoredUser('{"id":3}')).toBeNull();
    expect(parseStoredUser('null')).toBeNull();
    expect(parseStoredUser('42')).toBeNull();
  });
});

describe('stored user', () => {
  it('saves, reads and clears the user', () => {
    const store = stubStorage();

    saveUser(alice);
    expect(store.get(STORAGE_KEY)).toBe(JSON.stringify(alice));
    expect(readStoredUser()).toEqual(alice);

    clearUser();
    expect(readStoredUser()).toBeNull();
  });

  it('does not throw when the storage is unavailable', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    });

    expect(readStoredUser()).toBeNull();
    expect(() => saveUser(alice)).not.toThrow();
    expect(() => clearUser()).not.toThrow();
  });
});

describe('isAdmin', () => {
  it('is true only for the admin role', () => {
    expect(isAdmin({ id: 1, pseudo: 'alice', role: 'ROLE_ADMIN' })).toBe(true);
    expect(isAdmin(alice)).toBe(false);
  });
});
