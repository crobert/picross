import { NavLink } from 'react-router';
import classnames from 'classnames/bind';
import { ROUTES } from '../../../routes';
import type { MainNavProps } from './MainNav.types';
import styles from './MainNav.module.css';

const cx = classnames.bind(styles);

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  cx('MainNav-link', { 'MainNav-link--active': isActive });

const MainNav = ({ isAdmin = false }: MainNavProps) => (
  <nav aria-label="Menu principal" className={cx('MainNav')}>
    <NavLink className={linkClassName} to={ROUTES.dashboard}>
      Tableau de bord
    </NavLink>
    {isAdmin && (
      <NavLink className={linkClassName} to={ROUTES.adminUsers}>
        Utilisateurs
      </NavLink>
    )}
  </nav>
);

export default MainNav;
