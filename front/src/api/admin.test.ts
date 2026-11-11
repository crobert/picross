import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchAdminUsers } from './admin';
import { UnknownUserError } from './errors';

const stubFetch = (response: Partial<Response>) => {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchAdminUsers', () => {
  it('gets the users with the id of the caller in the X-User-Id header', async () => {
    const users = [
      {
        id: 12,
        pseudo: 'Stikul',
        role: 'ROLE_ADMIN',
        createdAt: '2026-11-10T21:00:00.000Z',
        completedCount: 1,
      },
    ];
    const fetchMock = stubFetch({ ok: true, json: async () => users });

    await expect(fetchAdminUsers(12)).resolves.toEqual(users);
    expect(fetchMock).toHaveBeenCalledWith('/api/admin/users', {
      headers: { 'X-User-Id': '12' },
      signal: undefined,
    });
  });

  it('throws an UnknownUserError when the caller does not exist', async () => {
    stubFetch({ ok: false, status: 404 });
    await expect(fetchAdminUsers(999)).rejects.toBeInstanceOf(UnknownUserError);
  });

  it('throws when the caller is not an admin or the server fails', async () => {
    stubFetch({ ok: false, status: 403 });
    await expect(fetchAdminUsers(1)).rejects.toThrow('status 403');
  });
});
