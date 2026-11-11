export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  adminUsers: '/admin/users',
  puzzlePattern: '/puzzles/:id',
  puzzle: (id: number) => `/puzzles/${id}`,
};
