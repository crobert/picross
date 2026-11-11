import type { Decorator } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

export const withTable: Decorator = (Story) => (
  <table>
    <tbody>
      <tr>
        <Story />
      </tr>
    </tbody>
  </table>
);

export const withRouter: Decorator = (Story) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);
