import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  clearUser,
  parseStoredUser,
  readStoredUser,
  saveUser,
  STORAGE_KEY,
} from './Session.utils';

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
    expect(parseStoredUser('{"id":3,"pseudo":"alice"}')).toEqual({
      id: 3,
      pseudo: 'alice',
    });
  });

  it('keeps only the id and the pseudo', () => {
    expect(parseStoredUser('{"id":3,"pseudo":"alice","admin":true}')).toEqual({
      id: 3,
      pseudo: 'alice',
    });
  });

  it('returns null for missing, malformed or incomplete data', () => {
    expect(parseStoredUser(null)).toBeNull();
    expect(parseStoredUser('')).toBeNull();
    expect(parseStoredUser('not json')).toBeNull();
    expect(parseStoredUser('{"id":"3","pseudo":"alice"}')).toBeNull();
    expect(parseStoredUser('{"id":3}')).toBeNull();
    expect(parseStoredUser('null')).toBeNull();
    expect(parseStoredUser('42')).toBeNull();
  });
});

describe('stored user', () => {
  it('saves, reads and clears the user', () => {
    const store = stubStorage();

    saveUser({ id: 1, pseudo: 'alice' });
    expect(store.get(STORAGE_KEY)).toBe('{"id":1,"pseudo":"alice"}');
    expect(readStoredUser()).toEqual({ id: 1, pseudo: 'alice' });

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
    expect(() => saveUser({ id: 1, pseudo: 'alice' })).not.toThrow();
    expect(() => clearUser()).not.toThrow();
  });
});
