import { useEffect, useState } from 'react';
import { fetchCompletions } from '../api/users';

export const useCompletions = (userId: number): number[] => {
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchCompletions(userId, controller.signal)
      .then((completions) =>
        setCompletedIds(completions.map(({ puzzleId }) => puzzleId)),
      )
      .catch(() => undefined);
    return () => controller.abort();
  }, [userId]);

  return completedIds;
};
