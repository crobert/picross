import type { Meta, StoryObj } from '@storybook/react';
import GameBoard from './index';

const meta = {
  title: 'Organisms/GameBoard',
  component: GameBoard,
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
    rows: [[2, 1], [1, 2], [1], [1, 2], [2, 1]],
    cols: [[1, 2], [2, 1], [2], [1, 1], [2, 1]],
  },
};
