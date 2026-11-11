import type { Role } from '../../../api/users';

const ROLE_LABELS: Record<Role, string> = {
  ROLE_ADMIN: 'Administrateur',
  ROLE_PLAYER: 'Joueur',
};

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' });

export const formatCreatedAt = (value: string): string =>
  dateFormat.format(new Date(value));

export const formatRole = (role: Role): string => ROLE_LABELS[role];
