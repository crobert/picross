import { describe, expect, it } from 'vitest';
import { formatCreatedAt, formatRole } from './UserTable.utils';

describe('formatCreatedAt', () => {
  it('formats an ISO date as day/month/year', () => {
    expect(formatCreatedAt('2026-11-10T12:00:00.000Z')).toBe('10/11/2026');
  });
});

describe('formatRole', () => {
  it('labels each role in French', () => {
    expect(formatRole('ROLE_ADMIN')).toBe('Administrateur');
    expect(formatRole('ROLE_PLAYER')).toBe('Joueur');
  });
});
