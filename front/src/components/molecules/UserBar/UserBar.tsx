import classnames from 'classnames/bind';
import Button from '../../atoms/Button';
import type { UserBarProps } from './UserBar.types';
import styles from './UserBar.module.css';

const cx = classnames.bind(styles);

const UserBar = ({ pseudo, onLogout }: UserBarProps) => (
  <div className={cx('UserBar')}>
    <span>
      Connecté : <strong>{pseudo}</strong>
    </span>
    <Button variant="outline" size="small" onClick={onLogout}>
      Se déconnecter
    </Button>
  </div>
);

export default UserBar;
