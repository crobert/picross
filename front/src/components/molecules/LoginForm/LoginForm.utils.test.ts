import { describe, expect, it } from 'vitest';
import { isValidPseudo } from './LoginForm.utils';

describe('isValidPseudo', () => {
  it('accepts 3 to 20 letters, digits, underscores and hyphens', () => {
    expect(isValidPseudo('abc')).toBe(true);
    expect(isValidPseudo('Alice_01-b')).toBe(true);
    expect(isValidPseudo('a'.repeat(20))).toBe(true);
  });

  it('rejects a pseudo that is too short or too long', () => {
    expect(isValidPseudo('ab')).toBe(false);
    expect(isValidPseudo('a'.repeat(21))).toBe(false);
    expect(isValidPseudo('')).toBe(false);
  });

  it('rejects spaces and special characters', () => {
    expect(isValidPseudo('al ice')).toBe(false);
    expect(isValidPseudo('alice!')).toBe(false);
    expect(isValidPseudo('aliçe')).toBe(false);
  });
});
