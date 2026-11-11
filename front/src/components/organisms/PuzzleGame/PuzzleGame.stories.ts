import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import PuzzleGame from './index';

const meta = {
  title: 'Organisms/PuzzleGame',
  component: PuzzleGame,
} satisfies Meta<typeof PuzzleGame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    puzzle: {
      id: 3,
      name: 'heart',
      cols: [[2], [4], [4], [4], [2]],
      rows: [[1, 1], [5], [5], [3], [1]],
    },
    userId: 1,
    onUnknownUser: fn(),
  },
};
