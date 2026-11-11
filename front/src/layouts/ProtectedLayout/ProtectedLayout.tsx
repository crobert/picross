import { useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router';
import classnames from 'classnames/bind';
import { useAuth } from '../../auth';
import UserBar from '../../components/molecules/UserBar';
import { ROUTES } from '../../routes';
import styles from './ProtectedLayout.module.css';

const cx = classnames.bind(styles);

function ProtectedLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!user) {
    return (
      <Navigate
        to={ROUTES.home}
        replace
        state={
          isLoggingOut
            ? undefined
            : { from: `${location.pathname}${location.search}` }
        }
      />
    );
  }

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
  };

  return (
    <div className={cx('ProtectedLayout')}>
      <header className={cx('ProtectedLayout-header')}>
        <Link className={cx('ProtectedLayout-brand')} to={ROUTES.dashboard}>
          Picross
        </Link>
        <UserBar pseudo={user.pseudo} onLogout={handleLogout} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
