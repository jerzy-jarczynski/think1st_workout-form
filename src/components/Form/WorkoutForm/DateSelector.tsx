import React, { useState, useEffect } from 'react';
import { fetchHolidays } from '../../../api';
import { Holiday } from '../../../types';

interface DateSelectorProps {
  header: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({ header }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);

  useEffect(() => {
    const fetchHolidaysData = async () => {
      try {
        const holidaysData = await fetchHolidays();
        setHolidays(holidaysData);
        console.log('Received holidays data:', holidaysData);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidaysData();
  }, []);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleChangeMonth = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(selectedDate);
    clickedDate.setDate(day);
    setSelectedDate(clickedDate);

    const holiday = holidays.find((holiday) => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.toDateString() === clickedDate.toDateString();
    });

    setSelectedHoliday(holiday || null);
  };

  const renderMonthSelector = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleChangeMonth(-1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </span>
        <button
          onClick={() => handleChangeMonth(1)}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    );
  };

  const renderDaysOfMonth = () => {
    const days = [];
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
    const adjustedFirstDayOfMonth =
      firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const totalDays = daysInMonth(selectedDate);
    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
    for (let i = 0; i < adjustedFirstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty-day"></div>);
    }
  
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(selectedDate);
      currentDate.setDate(i);
      const isSunday = currentDate.getDay() === 0;
      const isHoliday = holidays.some((holiday) => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.toDateString() === currentDate.toDateString();
      });
  
      const classNames = `day w-full sm:w-1/7 text-center py-2 cursor-pointer ${
        isSunday ? 'text-red-600' : ''
      } ${isHoliday ? 'bg-yellow-200' : ''} ${
        selectedDate.getDate() === i ? 'bg-blue-500 text-white' : ''
      }`;
  
      days.push(
        <div
          key={`day-${i}`}
          className={classNames}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }
  
    return (
      <div className="days-container grid grid-cols-7">
        {weekDays.map((day, index) => (
          <div key={index} className="font-semibold text-center py-2">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  return (
    <div className="date-selector">
      <h3 className="mb-2 text-xl font-semibold">{header}</h3>
      {renderMonthSelector()}
      {renderDaysOfMonth()}
      {selectedHoliday && (
        <div className="mt-4">
          <p className="block text-xs text-gray-500">{`It is Polish ${selectedHoliday.name}`}</p>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
