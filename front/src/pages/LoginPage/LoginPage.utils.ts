import { ROUTES } from '../../routes';

export const getRedirectTarget = (state: unknown): string => {
  if (typeof state === 'object' && state !== null && 'from' in state) {
    const { from } = state;
    if (
      typeof from === 'string' &&
      from.startsWith('/') &&
      !from.startsWith('//') &&
      from !== ROUTES.home
    ) {
      return from;
    }
  }
  return ROUTES.dashboard;
};
