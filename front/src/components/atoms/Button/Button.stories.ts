import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { withDarkBackground } from '../../../../.storybook/decorators';
import Button from './index';

const meta = {
  title: 'Atoms/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Valider',
    onClick: fn(),
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
  },
  decorators: [withDarkBackground],
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    isFullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const Click: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Valider' }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const ClickDisabled: Story = {
  args: {
    ...Disabled.args,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Valider' }));
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
