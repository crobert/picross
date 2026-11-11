import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from '../../../../.storybook/decorators';
import MainNav from './index';

const meta = {
  title: 'Molecules/MainNav',
  component: MainNav,
  decorators: [withRouter],
} satisfies Meta<typeof MainNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Admin: Story = {
  args: {
    isAdmin: true,
  },
};
