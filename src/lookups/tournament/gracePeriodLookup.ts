export interface IGracePeriodLookup {
  id: number;
  period: number;
}

export const GracePeriodLookup: IGracePeriodLookup[] = [
  {
    id: 0,
    period: 1,
  },
  {
    id: 1,
    period: 3,
  },
  {
    id: 2,
    period: 5,
  },
];
