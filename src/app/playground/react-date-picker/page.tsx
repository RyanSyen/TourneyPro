"use client";

/*
https://github.com/wojtekmaj/react-date-picker
https://github.com/wojtekmaj/react-calendar#props
*/

import "../../customDatePicker.scss";

import { CalendarIcon } from "@radix-ui/react-icons";
import { formatDate } from "date-fns/format";
import dayjs from "dayjs";
import { useState } from "react";
import Calendar from "react-calendar";
import DatePicker from "react-date-picker";

import { Button } from "@/components/ui/button";
import { PrimaryInput } from "@/components/ui/input";
import useLogger from "@/hooks/useLogger";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ReactDatePicker = () => {
  const logger = useLogger("react-date-picker");
  const [value, onChange] = useState<Value>(dayjs().startOf("day").toDate());
  const minDate = dayjs().subtract(100, "year").toDate();
  const maxDate = dayjs().endOf("month").toDate();

  logger.info("selected date: ", value);

  return (
    // <Button variant={"lineInput"} size={"input"}>
    <>
      <div className="flex justify-between h-9 w-full border-b border-[#444548] bg-transparent py-1 text-sm text-[#fcfcfc] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[#e50b0d] focus:duration-1000">
        <DatePicker
          onChange={onChange}
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          dayAriaLabel="Day"
          dayPlaceholder="dd"
          monthAriaLabel="Month"
          monthPlaceholder="mm"
          yearAriaLabel="Year"
          yearPlaceholder="yyyy"
          name="date of birth datepicker" //TODO: pass as props
          nativeInputAriaLabel="Date"
          onCalendarClose={() => {}}
          onCalendarOpen={() => {}}
          onFocus={() => {}}
          onInvalidChange={() => {}} // user picks an invalid date
          portalContainer={null} // element to render the calendar using portal
          required
          returnValue="start"
          showLeadingZeros={false} // configured to false else it will mess with the styling since we are using custom styling
          clearAriaLabel="Clear datepicker"
          next2Label={
            <div className="flex-center w-8 h-8 rounded-[50%] calendar-custom-icon">
              »
            </div>
          }
          nextLabel={
            <div className="flex-center w-8 h-8 rounded-[50%] calendar-custom-icon">
              ›
            </div>
          }
          prev2Label={
            <div className="flex-center w-8 h-8 rounded-[50%] calendar-custom-icon">
              «
            </div>
          }
          prevLabel={
            <div className="flex-center w-8 h-8 rounded-[50%] calendar-custom-icon">
              ‹
            </div>
          }
          clearIcon={null}
          calendarIcon={<CalendarIcon className="h-5 w-5" />}
          calendarAriaLabel="Toggle Calendar"
          autoFocus={false}
          format="dd/M/y"
          next2AriaLabel="Jump forwards"
          nextAriaLabel="Next"
          prev2AriaLabel="Jumb backwards"
          prevAriaLabel="Previous"
          // showDoubleView // configured to false else it will mess with the styling
          // showFixedNumberOfWeeks
          showNavigation
          // showNeighboringCentury
          formatMonthYear={(locale: string | undefined, date: Date) =>
            formatDate(date, "MMM yyyy")
          }
        />
      </div>
      <Calendar
        onChange={onChange}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        returnValue="start"
        next2Label={
          <div className="flex-center w-8 h-8 rounded-[50%] calendar-custom-icon">
            »
          </div>
        }
        nextLabel={
          <div className="flex-center w-8 h-8 rounded-[50%] calendar-custom-icon">
            ›
          </div>
        }
        prev2Label={
          <div className="flex-center w-8 h-8 rounded-[50%] calendar-custom-icon">
            «
          </div>
        }
        prevLabel={
          <div className="flex-center w-8 h-8 rounded-[50%] calendar-custom-icon">
            ‹
          </div>
        }
        next2AriaLabel="Jump forwards"
        nextAriaLabel="Next"
        prev2AriaLabel="Jumb backwards"
        prevAriaLabel="Previous"
        // showDoubleView // configured to false else it will mess with the styling
        // showFixedNumberOfWeeks
        showNavigation
        // showNeighboringCentury
        formatMonthYear={(locale: string | undefined, date: Date) =>
          formatDate(date, "MMM yyyy")
        }
      />
    </>

    // </Button>
  );
};

export default ReactDatePicker;
