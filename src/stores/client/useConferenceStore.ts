import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConferenceStore {
  isConferenceRegistered: boolean;
  conferenceId: number | null;
  setConferenceRegistered: (id: number) => void;
  clearConference: () => void;
}

export const useConferenceStore = create<ConferenceStore>()(
  persist(
    (set) => ({
      isConferenceRegistered: false,
      conferenceId: null,
      setConferenceRegistered: (id) => set({ 
        isConferenceRegistered: true,
        conferenceId: id 
      }),
      clearConference: () => set({ 
        isConferenceRegistered: false,
        conferenceId: null 
      }),
    }),
    {
      name: 'conference-store',
    }
  )
);
