import type { Meta, StoryObj } from '@storybook/react-vite';
import Alert from './index';

const meta = {
  title: 'Atoms/Alert',
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "La grille n'est pas correcte.",
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    children: 'Bravo, la grille est correcte !',
    variant: 'success',
  },
};
