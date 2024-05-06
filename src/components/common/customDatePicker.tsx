import "../../app/customDatePicker.scss";

import dayjs from "dayjs";

import { Calendar } from "../ui/calendar";

interface Props {
  selectedDate: Date | undefined;
  onChange: (...event: any[]) => void;
  numOfMonths?: number;
}

const CustomDatePicker = ({ selectedDate, onChange, numOfMonths }: Props) => {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onChange}
      disabled={(date) =>
        date > new Date() || date < dayjs(dayjs().get("year") - 100).toDate()
      }
      initialFocus
      captionLayout="dropdown"
      fromYear={dayjs().get("year") - 100}
      toYear={dayjs().get("year")}
      numberOfMonths={!numOfMonths ? 1 : numOfMonths}
      //   formatters={{
      //     /** Format the month in the caption when `captionLayout` is `buttons`. */
      //     formatCaption: undefined,
      //     /** Format the month in the navigation dropdown. */
      //     formatMonthCaption: undefined,
      //     /** Format the year in the navigation dropdown. */
      //     formatYearCaption: undefined,
      //     /** Format the day in the day cell. */
      //     formatDay: undefined,
      //     /** Format the week number. */
      //     formatWeekNumber: undefined,
      //     /** Format the week day name in the header */
      //     formatWeekdayName: undefined,
      //   }}
    />
  );
};

export default CustomDatePicker;
