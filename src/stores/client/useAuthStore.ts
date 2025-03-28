import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'ATTENDEE' | 'ADMIN' | 'RECRUITER' | null;

type UserAuthData = {
  accessToken: string | null;
  identifier: string | null;
  role: UserRole;
  id: number | null;
};

interface AuthState {
  user: UserAuthData;
  setAuth: (data: UserAuthData) => void;
  clearAuth: () => void;
}

const initialValue = {
  accessToken: null,
  identifier: null,
  role: null,
  id: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: initialValue,
      setAuth: ({ accessToken, identifier, role, id }: UserAuthData) =>
        set({ user: { accessToken, identifier, role, id } }),
      clearAuth: () => set({ user: initialValue }),
    }),
    {
      name: 'user-auth-storage',
    },
  ),
);
