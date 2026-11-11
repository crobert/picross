import { describe, expect, it } from 'vitest';
import { getRedirectTarget } from './LoginPage.utils';

describe('getRedirectTarget', () => {
  it('goes back to the page requested before the login', () => {
    expect(getRedirectTarget({ from: '/puzzles/4' })).toBe('/puzzles/4');
    expect(getRedirectTarget({ from: '/dashboard?tab=1' })).toBe(
      '/dashboard?tab=1',
    );
  });

  it('goes to the dashboard without a requested page', () => {
    expect(getRedirectTarget(null)).toBe('/dashboard');
    expect(getRedirectTarget(undefined)).toBe('/dashboard');
    expect(getRedirectTarget({})).toBe('/dashboard');
    expect(getRedirectTarget('/puzzles/4')).toBe('/dashboard');
  });

  it('ignores a target that is not an internal path', () => {
    expect(getRedirectTarget({ from: 'https://evil.example' })).toBe(
      '/dashboard',
    );
    expect(getRedirectTarget({ from: '//evil.example' })).toBe('/dashboard');
    expect(getRedirectTarget({ from: 42 })).toBe('/dashboard');
  });

  it('does not loop on the login page itself', () => {
    expect(getRedirectTarget({ from: '/' })).toBe('/dashboard');
  });
});
