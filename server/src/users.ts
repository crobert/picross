export type User = {
  id: number;
  pseudo: string;
};

const PSEUDO_PATTERN = /^[A-Za-z0-9_-]{3,20}$/;

export const normalizePseudo = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const pseudo = value.trim();
  return PSEUDO_PATTERN.test(pseudo) ? pseudo : null;
};
