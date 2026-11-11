import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import UserBar from './index';

const meta = {
  title: 'Molecules/UserBar',
  component: UserBar,
} satisfies Meta<typeof UserBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pseudo: 'Alice',
    onLogout: fn(),
  },
};
