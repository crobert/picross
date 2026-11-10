import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import GameBoard from './index';

const meta = {
  title: 'Organisms/GameBoard',
  component: GameBoard,
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof GameBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: [[2], [2]],
    cols: [[2], [2]],
  },
};

export const Large: Story = {
  args: {
    rows: [[1, 1], [5], [5], [3], [1]],
    cols: [[2], [4], [4], [4], [2]],
  },
};

export const MultipleClues: Story = {
  args: {
    rows: [[2, 1], [1, 2], [1, 1], [1, 2], [2, 1]],
    cols: [[1, 3], [2, 1], [2], [1, 1], [2, 1]],
  },
};

export const Keyboard: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const squares = canvas.getAllByLabelText('Non renseignée');

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await expect(squares[0]).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(squares[1]).toHaveFocus();

    await userEvent.keyboard(' ');
    await expect(args.onChange).toHaveBeenLastCalledWith([
      ['unknown', 'checked'],
      ['unknown', 'unknown'],
    ]);

    await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
    await expect(squares[3]).toHaveFocus();
    await expect(args.onChange).toHaveBeenLastCalledWith([
      ['unknown', 'checked'],
      ['unknown', 'checked'],
    ]);

    await userEvent.keyboard('{ArrowLeft}x');
    await expect(args.onChange).toHaveBeenLastCalledWith([
      ['unknown', 'checked'],
      ['empty', 'checked'],
    ]);

    await userEvent.keyboard('{Delete}');
    await expect(args.onChange).toHaveBeenLastCalledWith([
      ['unknown', 'checked'],
      ['unknown', 'checked'],
    ]);
  },
};
