import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs-plugin-utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const timeZone = dayjs.tz.guess();

/*
    We will always translate between utc and formatted datetime
*/

export const extDayjs = dayjs;

export const fx_dayjs = {
  IsUTC: (datetime = null) => {
    return dayjs(datetime).isUTC();
  },

  ToUTC: (datetime) => {
    return dayjs(datetime).utc().format();
  },

  ToLocal: (datetime = null) => {
    return dayjs(datetime).format();
  },

  CurrentUTC: () => {
    return dayjs().utc().format();
  },

  CurrentLocal: () => {
    return dayjs().format();
  },

  UTCToLocal: (datetime) => {
    const dt = dayjs(datetime).tz(timeZone).format();
    return dt;
  },

  LocalToUTC: (datetime) => {
    const dt = dayjs(datetime).utc().format();
    return dt;
  },

  NextDayUTC: () => {
    return dayjs().utc().add(1, 'day').format();
  },
};
