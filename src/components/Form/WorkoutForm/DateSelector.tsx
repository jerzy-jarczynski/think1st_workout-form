import React, { useState, useEffect } from 'react';
import { fetchHolidays } from '../../../api';
import { Holiday } from '../../../types';
import TimeSelector from './TimeSelector';

const DateSelector: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [selectedObservance, setSelectedObservance] = useState<string | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showTimeSelector, setShowTimeSelector] = useState<boolean>(false);

  useEffect(() => {
    const fetchHolidaysData = async () => {
      try {
        const holidaysData = await fetchHolidays();
        setHolidays(holidaysData);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidaysData();
  }, []);

  useEffect(() => {
    setSelectedObservance(null);
  }, [currentDate]);

  const isHoliday = (date: Date): boolean => {
    return holidays.some((holiday) => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.toDateString() === date.toDateString();
    });
  };

  const isNational = (date: Date): boolean => {
    return holidays.some((holiday) => {
      if (holiday.type === 'national_holiday') {
        const nationalDate = new Date(holiday.date);
        return nationalDate.toDateString() === date.toDateString();
      }
    });
  };

  const isObservance = (date: Date): boolean => {
    return holidays.some((holiday) => {
      if (holiday.type === 'observance') {
        const observanceDate = new Date(holiday.date);
        return observanceDate.toDateString() === date.toDateString();
      }
    });
  };

  const isSunday = (date: Date): boolean => {
    return date.getDay() === 0;
  };

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
    );
  };

  const currentMonth: number = currentDate.getMonth();
  const currentYear: number = currentDate.getFullYear();

  const daysInMonth: Date[] = getDaysInMonth(currentYear, currentMonth);

  const startDayOfWeek: number = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  let blankDaysLength =
    startDayOfWeek === 0 || startDayOfWeek === 7 ? 7 : startDayOfWeek - 1;

  const blankDays: JSX.Element[] = Array.from(
    { length: blankDaysLength },
    (_, index) => <div key={index} className="py-2 text-center"></div>
  );

  if (startDayOfWeek === 0 || startDayOfWeek === 7) {
    for (let i = blankDaysLength; i < 7; i++) {
      blankDays.push(<div key={i} className="py-2 text-center"></div>);
    }
  }

  const handleClick = (description: string | null, day: Date) => {
    if (!isSunday(day) && !isNational(day)) {
      setSelectedObservance((prevDescription) =>
        prevDescription === description ? null : description
      );
  
      setSelectedDay((prevSelectedDay) => {
        if (prevSelectedDay && prevSelectedDay.toDateString() === day.toDateString()) {
          setShowTimeSelector(false);
          return null;
        } else {
          setShowTimeSelector(true);
          return day;
        }
      });
    } else {
      setSelectedObservance(null);
      setSelectedDay(null);
      setShowTimeSelector(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h3>Date</h3>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="bg-gray-200 px-4 py-3 flex items-center justify-between">
          <button className="text-gray-600" onClick={goToPreviousMonth}>
            &lt;
          </button>
          <div className="text-gray-800 font-bold">
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </div>
          <button className="text-gray-600" onClick={goToNextMonth}>
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="py-2 text-center bg-gray-100">
              {day}
            </div>
          ))}

          {new Array(
            startDayOfWeek === 0 || startDayOfWeek === 7
              ? 6
              : startDayOfWeek - 1
          )
            .fill(null)
            .map((_, index) => (
              <div key={index} className="py-2 text-center"></div>
            ))}

          {daysInMonth.map((day, index) => {
            let backgroundColorClass = '';

            if (isHoliday(day)) {
              if (isNational(day)) {
                backgroundColorClass = 'bg-gray-200';
              } else if (isObservance(day)) {
                backgroundColorClass = 'bg-green-200';
              }
            } else if (isSunday(day)) {
              backgroundColorClass = 'bg-gray-200';
            }

            const holiday = holidays.find(
              (holiday) =>
                new Date(holiday.date).toDateString() === day.toDateString()
            );
            const description =
              holiday && holiday.type === 'observance'
                ? `It is Polish ${holiday.name}`
                : null;

            return (
              <div
                key={index}
                className={`py-2 text-center ${
                  selectedDay &&
                  selectedDay.toDateString() === day.toDateString()
                    ? 'bg-blue-500'
                    : backgroundColorClass
                }`}
                onClick={() => handleClick(description, day)}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>
      </div>
      {showTimeSelector && <TimeSelector />}
      {selectedObservance && (
        <div className="text-center mt-4 text-gray-700">
          {selectedObservance}
        </div>
      )}
    </div>
  );
};

export default DateSelector;
