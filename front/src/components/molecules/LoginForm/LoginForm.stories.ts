import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import LoginForm from './index';

const meta = {
  title: 'Molecules/LoginForm',
  component: LoginForm,
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Submitting: Story = {
  args: {
    ...Default.args,
    isSubmitting: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Connexion impossible.',
  },
};

export const Submit: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Pseudo');

    await userEvent.type(input, 'ab{Enter}');
    await expect(canvas.getByRole('alert')).toHaveTextContent('3 à 20');
    await expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.clear(input);
    await userEvent.type(input, '  Alice  {Enter}');
    await expect(args.onSubmit).toHaveBeenCalledWith('Alice');
    await expect(canvas.queryByRole('alert')).toBeNull();
  },
};
