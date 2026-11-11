import { Navigate, Outlet } from 'react-router';
import { isAdmin, useUser } from '../../auth';
import { ROUTES } from '../../routes';

function AdminLayout() {
  const user = useUser();

  if (!isAdmin(user)) return <Navigate to={ROUTES.dashboard} replace />;

  return <Outlet />;
}

export default AdminLayout;
