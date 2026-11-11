export const ROLES = ['ROLE_ADMIN', 'ROLE_PLAYER'] as const;

export type Role = (typeof ROLES)[number];

export type User = {
  id: number;
  pseudo: string;
  role: Role;
};

const PSEUDO_PATTERN = /^[A-Za-z0-9_-]{3,20}$/;
const USER_ID_PATTERN = /^[0-9]{1,9}$/;

export const normalizePseudo = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const pseudo = value.trim();
  return PSEUDO_PATTERN.test(pseudo) ? pseudo : null;
};

export const parseUserId = (value: unknown): number | null => {
  if (typeof value !== 'string' || !USER_ID_PATTERN.test(value)) return null;
  return Number(value);
};
