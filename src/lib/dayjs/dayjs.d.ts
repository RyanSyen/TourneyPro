import { Dayjs } from 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    utc(): Dayjs;
  }
}
