import { create } from 'zustand';

interface ConferenceStore {
  isConferenceRegistered: boolean;
  setConferenceRegistered: (registered: boolean) => void;
}

export const useConferenceStore = create<ConferenceStore>((set) => ({
  isConferenceRegistered: false,
  setConferenceRegistered: (registered) => set({ isConferenceRegistered: registered }),
}));
