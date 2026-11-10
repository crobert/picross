const PSEUDO_PATTERN = /^[A-Za-z0-9_-]{3,20}$/;

export const PSEUDO_RULE =
  'Le pseudo contient de 3 à 20 caractères : lettres, chiffres, _ ou -.';

export const isValidPseudo = (value: string): boolean =>
  PSEUDO_PATTERN.test(value);
