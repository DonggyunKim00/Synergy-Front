import { create } from 'zustand';

interface BoothStoreState {
    isBoothRegistered: boolean;
    hasAggregationData: boolean;
    setIsBoothRegistered: (registered: boolean) => void;
    setHasAggregationData: (hasData: boolean) => void;
}

export const useBoothStore = create<BoothStoreState>((set) => ({
    isBoothRegistered: false,
    hasAggregationData: false,
    setIsBoothRegistered: (registered) => set({ isBoothRegistered: registered }),
    setHasAggregationData: (hasData) => set({ hasAggregationData: hasData }),
}));
