import { Link, useParams } from 'react-router';
import classnames from 'classnames/bind';
import { useAuth, useUser } from '../../auth';
import Alert from '../../components/atoms/Alert';
import PuzzleGame from '../../components/organisms/PuzzleGame';
import { usePuzzle } from '../../hooks/usePuzzle';
import { ROUTES } from '../../routes';
import styles from './PuzzlePage.module.css';

const cx = classnames.bind(styles);

function PuzzleView({ id }: { id: string }) {
  const user = useUser();
  const { logout } = useAuth();
  const state = usePuzzle(id);

  return (
    <section className={cx('PuzzlePage')}>
      <Link className={cx('PuzzlePage-back')} to={ROUTES.dashboard}>
        ← Tableau de bord
      </Link>
      {state.status === 'loading' && (
        <p className={cx('PuzzlePage-status')}>Chargement…</p>
      )}
      {state.status === 'failed' && (
        <Alert role="alert">Impossible de charger le puzzle.</Alert>
      )}
      {state.status === 'notFound' && (
        <Alert role="alert">Puzzle introuvable.</Alert>
      )}
      {state.status === 'ready' && (
        <>
          <h1>{state.puzzle.name}</h1>
          <PuzzleGame
            puzzle={state.puzzle}
            userId={user.id}
            onUnknownUser={logout}
          />
        </>
      )}
    </section>
  );
}

function PuzzlePage() {
  const { id = '' } = useParams();
  return <PuzzleView key={id} id={id} />;
}

export default PuzzlePage;
