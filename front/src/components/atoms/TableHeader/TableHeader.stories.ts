import type { Meta, StoryObj } from '@storybook/react-vite';
import { withTable } from '../../../../.storybook/decorators';
import TableHeader from './index';

const meta = {
  title: 'Atoms/TableHeader',
  component: TableHeader,
  decorators: [withTable],
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
