import { useEffect, useState } from 'react';
import { fetchAdminUsers, type AdminUser } from '../api/admin';
import { UnknownUserError } from '../api/errors';

export const useAdminUsers = (userId: number, onUnknownUser: () => void) => {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchAdminUsers(userId, controller.signal)
      .then(setUsers)
      .catch((error: unknown) => {
        if (error instanceof UnknownUserError) {
          onUnknownUser();
        } else if (!(
          error instanceof DOMException && error.name === 'AbortError'
        )) {
          setFailed(true);
        }
      });
    return () => controller.abort();
  }, [userId, onUnknownUser]);

  return { users, failed };
};
