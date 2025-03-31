import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionStore {
  isSessionRegistered: boolean;
  hasAggregationData: boolean;
  setSessionRegistered: (registered: boolean) => void;
  setAggregationData: (hasData: boolean) => void;
  clearSession: () => void;
}

const initialSessionValue = {
  isSessionRegistered: false,
  hasAggregationData: false,
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      ...initialSessionValue,
      setSessionRegistered: (registered) => set({ isSessionRegistered: registered }),
      setAggregationData: (hasData) => set({ hasAggregationData: hasData }),
      clearSession: () => set(initialSessionValue),
    }),
    {
      name: 'session-store',
    },
  ),
);
