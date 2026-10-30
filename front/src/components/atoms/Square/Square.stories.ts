import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Square from './index';

const meta = {
  title: 'Atoms/Square',
  component: Square,
} satisfies Meta<typeof Square>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: fn(),
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    state: 'checked',
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    state: 'empty',
  },
};
