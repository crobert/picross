import { describe, expect, it } from 'vitest';
import { normalizePseudo } from './users';

describe('normalizePseudo', () => {
  it('accepts 3 to 20 letters, digits, underscores and hyphens', () => {
    expect(normalizePseudo('abc')).toBe('abc');
    expect(normalizePseudo('Alice_01-b')).toBe('Alice_01-b');
    expect(normalizePseudo('a'.repeat(20))).toBe('a'.repeat(20));
  });

  it('trims surrounding spaces and keeps the case', () => {
    expect(normalizePseudo('  Alice  ')).toBe('Alice');
  });

  it('rejects a pseudo that is too short or too long', () => {
    expect(normalizePseudo('ab')).toBeNull();
    expect(normalizePseudo('a'.repeat(21))).toBeNull();
    expect(normalizePseudo('   ')).toBeNull();
  });

  it('rejects forbidden characters', () => {
    expect(normalizePseudo('al ice')).toBeNull();
    expect(normalizePseudo('alice!')).toBeNull();
    expect(normalizePseudo('aliçe')).toBeNull();
    expect(normalizePseudo("al'ice")).toBeNull();
  });

  it('rejects a value that is not a string', () => {
    expect(normalizePseudo(undefined)).toBeNull();
    expect(normalizePseudo(null)).toBeNull();
    expect(normalizePseudo(12345)).toBeNull();
    expect(normalizePseudo({ pseudo: 'alice' })).toBeNull();
  });
});
