import type { Decorator } from '@storybook/react-vite';

export const withTable: Decorator = (Story) => (
  <table>
    <tbody>
      <tr>
        <Story />
      </tr>
    </tbody>
  </table>
);
