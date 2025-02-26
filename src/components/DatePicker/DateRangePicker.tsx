'use client'

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

type DateRangePickerProps = {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="relative">
      <Image
        src="/assets/calendar.svg"
        alt="Calendar Icon"
        width={24}
        height={24}
        className="transform -translate-y-1/2 w-5 h-5 cursor-pointer absolute z-20 top-[20px] ml-2"
      />
      <DatePicker
        selected={startDate}
        onChange={(update: [Date | null, Date | null]) => {
          setDateRange(update);
          onDateChange(update[0], update[1]);
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat="MMMM d, yyyy"
        placeholderText="Select a date range"
        className="w-full rounded-lg px-4 py-2 lg:min-w-[300px] text-[#71717A] border border-[#D0D5DD] focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer text-sm relative text-center"
      />
    </div>
  );
};

export default DateRangePicker;
