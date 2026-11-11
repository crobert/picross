import { Link, useParams } from 'react-router';
import classnames from 'classnames/bind';
import { useUser } from '../../auth';
import PuzzleGame from '../../components/organisms/PuzzleGame';
import { usePuzzle } from '../../hooks/usePuzzle';
import { ROUTES } from '../../routes';
import styles from './PuzzlePage.module.css';

const cx = classnames.bind(styles);

function PuzzleView({ id }: { id: string }) {
  const user = useUser();
  const state = usePuzzle(id);

  return (
    <section className={cx('PuzzlePage')}>
      <Link to={ROUTES.dashboard}>← Tableau de bord</Link>
      {state.status === 'loading' && <p>Chargement…</p>}
      {state.status === 'failed' && <p>Impossible de charger le puzzle.</p>}
      {state.status === 'notFound' && <p>Puzzle introuvable.</p>}
      {state.status === 'ready' && (
        <>
          <h1>{state.puzzle.name}</h1>
          <PuzzleGame puzzle={state.puzzle} userId={user.id} />
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
