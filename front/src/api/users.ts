export type User = {
  id: number;
  pseudo: string;
};

export const login = async (
  pseudo: string,
  signal?: AbortSignal,
): Promise<User> => {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo }),
    signal,
  });
  if (!response.ok) {
    throw new Error(
      `POST /api/users/login failed with status ${response.status}`,
    );
  }
  return response.json();
};
