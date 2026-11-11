import { afterEach, describe, expect, it, vi } from 'vitest';
import { UnknownUserError } from './errors';
import { fetchPuzzle, validateGrid } from './puzzles';

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

  it('throws an UnknownUserError when the user does not exist', async () => {
    stubFetch({
      ok: false,
      status: 404,
      json: async () => ({ error: 'User not found' }),
    });
    await expect(validateGrid(3, 999, [[1]])).rejects.toBeInstanceOf(
      UnknownUserError,
    );
  });

  it('throws a plain error when the puzzle does not exist', async () => {
    stubFetch({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Puzzle not found' }),
    });
    const request = validateGrid(999, 7, [[1]]);
    await expect(request).rejects.toThrow('status 404');
    await expect(request).rejects.not.toBeInstanceOf(UnknownUserError);
  });

  it('throws when the server answers with an error status', async () => {
    stubFetch({ ok: false, status: 400 });
    await expect(validateGrid(3, 7, [[1]])).rejects.toThrow('status 400');
  });
});

describe('fetchPuzzle', () => {
  const puzzle = { id: 3, name: 'heart', cols: [[1]], rows: [[1]] };

  it('gets the puzzle by id', async () => {
    const fetchMock = stubFetch({
      ok: true,
      status: 200,
      json: async () => puzzle,
    });

    await expect(fetchPuzzle(3)).resolves.toEqual(puzzle);
    expect(fetchMock).toHaveBeenCalledWith('/api/puzzles/3', {
      signal: undefined,
    });
  });

  it('returns null when the puzzle does not exist or the id is invalid', async () => {
    stubFetch({ ok: false, status: 404 });
    await expect(fetchPuzzle(999)).resolves.toBeNull();

    stubFetch({ ok: false, status: 400 });
    await expect(fetchPuzzle('abc')).resolves.toBeNull();
  });

  it('throws on any other error status', async () => {
    stubFetch({ ok: false, status: 500 });
    await expect(fetchPuzzle(3)).rejects.toThrow('status 500');
  });
});
