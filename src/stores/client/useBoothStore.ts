import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BoothStoreState {
    isBoothRegistered: boolean;
    hasAggregationData: boolean;
    setIsBoothRegistered: (registered: boolean) => void;
    setHasAggregationData: (hasData: boolean) => void;
    clearBooth: () => void;
}

const initialBoothValue ={
    isBoothRegistered: false,
    hasAggregationData: false, 
}
export const useBoothStore = create<BoothStoreState>()(
    persist(
        (set) => ({
            ...initialBoothValue,
            setIsBoothRegistered: (registered) => set({isBoothRegistered: registered}),
            setHasAggregationData: (hasData) => set({ hasAggregationData: hasData}),
            clearBooth: () => set(initialBoothValue),
        }),
        {
            name: 'booth-store',
        },
    ),
);
