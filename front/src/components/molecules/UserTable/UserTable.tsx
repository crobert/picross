import classnames from 'classnames/bind';
import type { UserTableProps } from './UserTable.types';
import { formatCreatedAt, formatRole } from './UserTable.utils';
import styles from './UserTable.module.css';

const cx = classnames.bind(styles);

const UserTable = ({ users }: UserTableProps) => (
  <table className={cx('UserTable')}>
    <thead>
      <tr>
        <th scope="col">Pseudo</th>
        <th scope="col">Rôle</th>
        <th scope="col">Inscrit le</th>
        <th scope="col">Puzzles terminés</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.pseudo}</td>
          <td>{formatRole(user.role)}</td>
          <td>{formatCreatedAt(user.createdAt)}</td>
          <td className={cx('UserTable-count')}>{user.completedCount}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;
