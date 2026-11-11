import classnames from 'classnames/bind';
import type { UserBarProps } from './UserBar.types';
import styles from './UserBar.module.css';

const cx = classnames.bind(styles);

const UserBar = ({ pseudo, onLogout }: UserBarProps) => (
  <div className={cx('UserBar')}>
    <span>
      Connecté : <strong>{pseudo}</strong>
    </span>
    <button type="button" className={cx('UserBar-logout')} onClick={onLogout}>
      Se déconnecter
    </button>
  </div>
);

export default UserBar;
