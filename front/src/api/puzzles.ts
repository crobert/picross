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

export const validateGrid = async (
  puzzleId: number,
  grid: number[][],
  signal?: AbortSignal,
): Promise<boolean> => {
  const response = await fetch(`/api/puzzles/${puzzleId}/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grid }),
    signal,
  });
  if (!response.ok) {
    throw new Error(
      `POST /api/puzzles/${puzzleId}/validate failed with status ${response.status}`,
    );
  }
  const { valid } = await response.json();
  return valid === true;
};
