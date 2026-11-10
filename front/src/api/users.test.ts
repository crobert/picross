import { afterEach, describe, expect, it, vi } from 'vitest';
import { login } from './users';

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
