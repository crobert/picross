import classnames from 'classnames/bind';
import { useAuth, useUser } from '../../auth';
import UserTable from '../../components/molecules/UserTable';
import { useAdminUsers } from '../../hooks/useAdminUsers';
import styles from './AdminUsersPage.module.css';

const cx = classnames.bind(styles);

function AdminUsersPage() {
  const user = useUser();
  const { logout } = useAuth();
  const { users, failed } = useAdminUsers(user.id, logout);

  return (
    <section className={cx('AdminUsersPage')}>
      <h1>Utilisateurs</h1>
      {failed && <p>Impossible de charger les utilisateurs.</p>}
      {!failed && !users && <p>Chargement…</p>}
      {users && <UserTable users={users} />}
    </section>
  );
}

export default AdminUsersPage;
