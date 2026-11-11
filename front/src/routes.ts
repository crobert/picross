export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  puzzlePattern: '/puzzles/:id',
  puzzle: (id: number) => `/puzzles/${id}`,
};
