import { Navigate, Route, Routes } from 'react-router';
import AdminLayout from './layouts/AdminLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import AdminUsersPage from './pages/AdminUsersPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import PuzzlePage from './pages/PuzzlePage';
import { ROUTES } from './routes';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<LoginPage />} />
      <Route element={<ProtectedLayout />}>
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />
        <Route path={ROUTES.puzzlePattern} element={<PuzzlePage />} />
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.adminUsers} element={<AdminUsersPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}

export default App;
