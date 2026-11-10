import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import classnames from 'classnames/bind';
import type { GameBoardProps, PaintMode, Position } from './GameBoard.types';
import {
  createGrid,
  getKeyboardValue,
  getTargetState,
  isArrowKey,
  moveFocus,
  paintSquare,
  resolvePaint,
} from './GameBoard.utils';
import styles from './GameBoard.module.css';
import ModeToggle from '../../atoms/ModeToggle';
import TableHeader from '../../atoms/TableHeader';
import Square from '../../atoms/Square';
import type { SquareState } from '../../atoms/Square/Square.types';

const cx = classnames.bind(styles);

const GameBoard = ({ rows, cols, onChange }: GameBoardProps) => {
  const [grid, setGrid] = useState(() => createGrid(rows.length, cols.length));
  const [mode, setMode] = useState<PaintMode>('checked');
  const [focused, setFocused] = useState<Position>({ row: 0, col: 0 });
  const gridRef = useRef(grid);
  const focusedRef = useRef(focused);
  const dragValueRef = useRef<SquareState | null>(null);
  const keyValueRef = useRef<SquareState | null>(null);
  const squareRefs = useRef<(HTMLTableCellElement | null)[][]>([]);

  useEffect(() => {
    const stopDrag = () => {
      dragValueRef.current = null;
    };
    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);
    return () => {
      window.removeEventListener('pointerup', stopDrag);
      window.removeEventListener('pointercancel', stopDrag);
    };
  }, []);

  const paint = (row: number, col: number, value: SquareState) => {
    const next = paintSquare(gridRef.current, row, col, value);
    if (next === gridRef.current) return;
    gridRef.current = next;
    setGrid(next);
    onChange?.(next);
  };

  const focusSquare = (position: Position) => {
    focusedRef.current = position;
    setFocused(position);
    squareRefs.current[position.row]?.[position.col]?.focus();
  };

  const handlePointerDown =
    (row: number, col: number) =>
    (event: PointerEvent<HTMLTableCellElement>) => {
      const target = getTargetState(event.button, mode);
      if (!target) return;
      const value = resolvePaint(gridRef.current[row][col], target);
      dragValueRef.current = value;
      paint(row, col, value);
    };

  const handlePointerEnter = (row: number, col: number) => () => {
    if (dragValueRef.current) paint(row, col, dragValueRef.current);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const { row, col } = focusedRef.current;

    if (isArrowKey(event.key)) {
      event.preventDefault();
      const next = moveFocus(
        focusedRef.current,
        event.key,
        rows.length,
        cols.length,
      );
      if (event.shiftKey && keyValueRef.current) {
        paint(next.row, next.col, keyValueRef.current);
      } else {
        keyValueRef.current = null;
      }
      focusSquare(next);
      return;
    }

    const value = getKeyboardValue(event.key, gridRef.current[row][col], mode);
    if (value === null) return;
    event.preventDefault();
    keyValueRef.current = value;
    paint(row, col, value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLTableElement>) => {
    if (event.key === 'Shift') keyValueRef.current = null;
  };

  return (
    <div className={cx('GameBoard')}>
      <ModeToggle mode={mode} onChange={setMode} />
      <table
        className={cx('GameBoard-table')}
        role="grid"
        onContextMenu={(event) => event.preventDefault()}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <tbody>
          <tr>
            <td></td>
            {cols.map((col, idx) => {
              return <TableHeader direction="col" values={col} key={idx} />;
            })}
          </tr>
          {rows.map((row, rowIdx) => {
            return (
              <tr key={rowIdx}>
                <TableHeader direction="row" values={row} />
                {cols.map((_, colIdx) => {
                  return (
                    <Square
                      key={colIdx}
                      ref={(element) => {
                        (squareRefs.current[rowIdx] ??= [])[colIdx] = element;
                      }}
                      state={grid[rowIdx][colIdx]}
                      tabIndex={
                        focused.row === rowIdx && focused.col === colIdx
                          ? 0
                          : -1
                      }
                      onFocus={() => {
                        focusedRef.current = { row: rowIdx, col: colIdx };
                        setFocused(focusedRef.current);
                      }}
                      onPointerDown={handlePointerDown(rowIdx, colIdx)}
                      onPointerEnter={handlePointerEnter(rowIdx, colIdx)}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GameBoard;
