import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import ModeToggle from './index';

const meta = {
  title: 'Atoms/ModeToggle',
  component: ModeToggle,
} satisfies Meta<typeof ModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'checked',
    onChange: fn(),
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    mode: 'empty',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};
