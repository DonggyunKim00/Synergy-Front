import { create } from 'zustand';

interface SessionStore {
  isSessionRegistered: boolean;
  hasAggregationData: boolean;
  setSessionRegistered: (registered: boolean) => void;
  setAggregationData: (hasData: boolean) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  isSessionRegistered: false,
  hasAggregationData: false,
  setSessionRegistered: (registered) => set({ isSessionRegistered: registered }),
  setAggregationData: (hasData) => set({ hasAggregationData: hasData }),
}));
