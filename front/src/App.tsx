import { Navigate, Route, Routes } from 'react-router';
import ProtectedLayout from './layouts/ProtectedLayout';
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
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}

export default App;
