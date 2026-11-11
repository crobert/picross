import { useEffect, useState } from 'react';
import { UnknownUserError } from '../api/errors';
import { fetchCompletions } from '../api/users';

export const useCompletions = (
  userId: number,
  onUnknownUser: () => void,
): number[] => {
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchCompletions(userId, controller.signal)
      .then((completions) =>
        setCompletedIds(completions.map(({ puzzleId }) => puzzleId)),
      )
      .catch((error: unknown) => {
        if (error instanceof UnknownUserError) onUnknownUser();
      });
    return () => controller.abort();
  }, [userId, onUnknownUser]);

  return completedIds;
};
