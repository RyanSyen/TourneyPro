import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export class CustomError extends Error {
  digest?: string;

  constructor(message: string, digest?: string) {
    super(message);
    this.digest = digest;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logError(error: CustomError | any) {
  console.error(`Error: ${error?.message}`);

  if (error.digest) {
    console.error(`Find details with digest: ${error.digest}`);
  }
}
