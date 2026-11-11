import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchCompletions, login } from './users';

const stubFetch = (response: Partial<Response>) => {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('login', () => {
  it('posts the pseudo to the login route', async () => {
    const fetchMock = stubFetch({
      ok: true,
      json: async () => ({ id: 1, pseudo: 'alice' }),
    });

    await login('alice');

    expect(fetchMock).toHaveBeenCalledWith('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo: 'alice' }),
      signal: undefined,
    });
  });

  it('returns the user sent by the server', async () => {
    stubFetch({ ok: true, json: async () => ({ id: 7, pseudo: 'Alice' }) });
    await expect(login('alice')).resolves.toEqual({ id: 7, pseudo: 'Alice' });
  });

  it('throws when the server answers with an error status', async () => {
    stubFetch({ ok: false, status: 400 });
    await expect(login('a')).rejects.toThrow('status 400');
  });
});

describe('fetchCompletions', () => {
  it('gets the completions of the user', async () => {
    const completions = [
      { puzzleId: 3, completedAt: '2026-11-10T21:12:16.700Z' },
    ];
    const fetchMock = stubFetch({ ok: true, json: async () => completions });

    await expect(fetchCompletions(12)).resolves.toEqual(completions);
    expect(fetchMock).toHaveBeenCalledWith('/api/users/12/completions', {
      signal: undefined,
    });
  });

  it('throws when the server answers with an error status', async () => {
    stubFetch({ ok: false, status: 404 });
    await expect(fetchCompletions(999)).rejects.toThrow('status 404');
  });
});
