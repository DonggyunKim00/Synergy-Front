import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const StorageKey = 'onboarding-form-key';

interface State {
  form: Record<string, any>;
  setForm: (key: string, value: any) => void;
  initForm: () => void;
}

export const useFormStore = create(
  persist<State>(
    (set, get) => ({
      form: {},
      setForm: (key, value) => {
        set({ form: { ...get().form, [key]: value } });
      },
      initForm: () => {
        set({ form: {} });
      },
    }),
    {
      name: StorageKey,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
