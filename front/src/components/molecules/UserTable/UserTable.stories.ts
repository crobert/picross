import type { Meta, StoryObj } from '@storybook/react-vite';
import UserTable from './index';

const meta = {
  title: 'Molecules/UserTable',
  component: UserTable,
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    users: [
      {
        id: 1,
        pseudo: 'Alice',
        role: 'ROLE_ADMIN',
        createdAt: '2026-11-10T21:00:00.000Z',
        completedCount: 3,
      },
      {
        id: 2,
        pseudo: 'Bob',
        role: 'ROLE_PLAYER',
        createdAt: '2026-11-11T09:30:00.000Z',
        completedCount: 0,
      },
    ],
  },
};
