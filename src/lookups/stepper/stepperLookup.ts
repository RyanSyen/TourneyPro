export interface IStepperLookup {
  id: number;
  name: string;
  isDone: boolean;
}

export const StepperLookup: IStepperLookup[] = [
  {
    id: 1,
    name: "Sign Up Terms",
    isDone: false,
  },
  {
    id: 2,
    name: "User Role",
    isDone: false,
  },
  {
    id: 3,
    name: "Account Info",
    isDone: false,
  },
  {
    id: 4,
    name: "Confirmation",
    isDone: false,
  },
];
