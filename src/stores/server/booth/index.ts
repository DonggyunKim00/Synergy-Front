import { useSuspenseQuery } from '@tanstack/react-query';
import { boothQueries } from './queries';

export const useBoothList = () => {
  return useSuspenseQuery(boothQueries.lists());
};

export const useBoothDetail = (boothId: number) => {
  return useSuspenseQuery(boothQueries.details(boothId));
};
