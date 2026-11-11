import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from '../../../../.storybook/decorators';
import PuzzleList from './index';

const puzzles = [
  {
    id: 3,
    name: 'heart',
    cols: [[2], [4], [4], [4], [2]],
    rows: [[1, 1], [5], [5], [3], [1]],
  },
  {
    id: 4,
    name: 'multiple-clues',
    cols: [[1, 3], [2, 1], [2], [1, 1], [2, 1]],
    rows: [
      [2, 1],
      [1, 2],
      [1, 1],
      [1, 2],
      [2, 1],
    ],
  },
];

const meta = {
  title: 'Molecules/PuzzleList',
  component: PuzzleList,
  decorators: [withRouter],
} satisfies Meta<typeof PuzzleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    puzzles,
    completedIds: [],
  },
};

export const WithCompleted: Story = {
  args: {
    ...Default.args,
    completedIds: [3],
  },
};
