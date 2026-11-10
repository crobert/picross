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
