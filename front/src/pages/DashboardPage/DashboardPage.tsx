import classnames from 'classnames/bind';
import { useAuth, useUser } from '../../auth';
import Alert from '../../components/atoms/Alert';
import PuzzleList from '../../components/molecules/PuzzleList';
import { useCompletions } from '../../hooks/useCompletions';
import { usePuzzles } from '../../hooks/usePuzzles';
import styles from './DashboardPage.module.css';

const cx = classnames.bind(styles);

function DashboardPage() {
  const user = useUser();
  const { logout } = useAuth();
  const { puzzles, failed } = usePuzzles();
  const completedIds = useCompletions(user.id, logout);

  return (
    <section className={cx('DashboardPage')}>
      <h1>Tableau de bord</h1>
      {failed && <Alert role="alert">Impossible de charger les puzzles.</Alert>}
      {!failed && !puzzles && (
        <p className={cx('DashboardPage-status')}>Chargement…</p>
      )}
      {puzzles && puzzles.length === 0 && (
        <p className={cx('DashboardPage-status')}>Aucun puzzle.</p>
      )}
      {puzzles && puzzles.length > 0 && (
        <PuzzleList puzzles={puzzles} completedIds={completedIds} />
      )}
    </section>
  );
}

export default DashboardPage;
