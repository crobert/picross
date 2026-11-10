import type { PointerEvent } from 'react';
import classnames from 'classnames/bind';
import type { SquareProps } from './Square.types';
import { SQUARE_LABELS } from './Square.utils';
import styles from './Square.module.css';

const cx = classnames.bind(styles);

const Square = ({
  state = 'unknown',
  isReadOnly,
  tabIndex,
  ref,
  onFocus,
  onPointerDown,
  onPointerEnter,
}: SquareProps) => {
  const handlePointerDown = (event: PointerEvent<HTMLTableCellElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    onPointerDown?.(event);
  };

  return (
    <td
      ref={ref}
      className={cx('Square', {
        'Square--checked': state === 'checked',
        'Square--empty': state === 'empty',
        'Square--readonly': isReadOnly,
      })}
      aria-label={SQUARE_LABELS[state]}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onPointerDown={isReadOnly ? undefined : handlePointerDown}
      onPointerEnter={isReadOnly ? undefined : onPointerEnter}
    >
      {state === 'empty' ? '-' : null}
    </td>
  );
};

export default Square;
