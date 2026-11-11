import { Link, Navigate, Outlet } from 'react-router';
import classnames from 'classnames/bind';
import { useAuth } from '../../auth';
import UserBar from '../../components/molecules/UserBar';
import { ROUTES } from '../../routes';
import styles from './ProtectedLayout.module.css';

const cx = classnames.bind(styles);

function ProtectedLayout() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to={ROUTES.home} replace />;

  return (
    <div className={cx('ProtectedLayout')}>
      <header className={cx('ProtectedLayout-header')}>
        <Link className={cx('ProtectedLayout-brand')} to={ROUTES.dashboard}>
          Picross
        </Link>
        <UserBar pseudo={user.pseudo} onLogout={logout} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
