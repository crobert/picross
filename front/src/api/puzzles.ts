import { UnknownUserError } from './errors';

export type Puzzle = {
  id: number;
  name: string;
  cols: number[][];
  rows: number[][];
};

export const fetchPuzzles = async (signal?: AbortSignal): Promise<Puzzle[]> => {
  const response = await fetch('/api/puzzles', { signal });
  if (!response.ok) {
    throw new Error(`GET /api/puzzles failed with status ${response.status}`);
  }
  return response.json();
};

export const fetchPuzzle = async (
  id: string | number,
  signal?: AbortSignal,
): Promise<Puzzle | null> => {
  const response = await fetch(`/api/puzzles/${id}`, { signal });
  if (response.status === 404 || response.status === 400) return null;
  if (!response.ok) {
    throw new Error(
      `GET /api/puzzles/${id} failed with status ${response.status}`,
    );
  }
  return response.json();
};

export const validateGrid = async (
  puzzleId: number,
  userId: number,
  grid: number[][],
  signal?: AbortSignal,
): Promise<boolean> => {
  const response = await fetch(`/api/puzzles/${puzzleId}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, grid }),
    signal,
  });
  if (response.status === 404) {
    const body = await response.json().catch(() => null);
    if (body?.error === 'User not found') throw new UnknownUserError();
  }
  if (!response.ok) {
    throw new Error(
      `POST /api/puzzles/${puzzleId}/validate failed with status ${response.status}`,
    );
  }
  const { valid } = await response.json();
  return valid === true;
};
