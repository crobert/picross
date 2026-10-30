import type { Meta, StoryObj } from '@storybook/react-vite';
import TableHeader from './index';

const meta = {
  title: 'Atoms/TableHeader',
  component: TableHeader,
} satisfies Meta<typeof TableHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    values: [1, 1, 2],
  },
};

export const Col: Story = {
  args: {
    ...Default.args,
    direction: 'col',
  },
};
