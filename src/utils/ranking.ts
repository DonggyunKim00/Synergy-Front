export const translateLevel = (membership: string) => {
  if (membership === 'PLATINUM') return 'PL';
  if (membership === 'GOLD') return 'GD';
  if (membership === 'SILVER') return 'SV';
  if (membership === 'BRONZE') return 'BZ';
  return 'DF';
};
