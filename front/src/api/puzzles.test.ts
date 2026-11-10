import { afterEach, describe, expect, it, vi } from 'vitest';
import { validateGrid } from './puzzles';

const stubFetch = (response: Partial<Response>) => {
  const fetchMock = vi.fn().mockResolvedValue(response);
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('validateGrid', () => {
  it('posts the grid to the validate route of the puzzle', async () => {
    const fetchMock = stubFetch({
      ok: true,
      json: async () => ({ valid: true }),
    });

    await validateGrid(3, 7, [[1, 0]]);

    expect(fetchMock).toHaveBeenCalledWith('/api/puzzles/3/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 7, grid: [[1, 0]] }),
      signal: undefined,
    });
  });

  it('returns the validity sent by the server', async () => {
    stubFetch({ ok: true, json: async () => ({ valid: true }) });
    await expect(validateGrid(3, 7, [[1]])).resolves.toBe(true);

    stubFetch({ ok: true, json: async () => ({ valid: false }) });
    await expect(validateGrid(3, 7, [[1]])).resolves.toBe(false);
  });

  it('throws when the server answers with an error status', async () => {
    stubFetch({ ok: false, status: 404 });
    await expect(validateGrid(999, 7, [[1]])).rejects.toThrow('status 404');
  });
});
