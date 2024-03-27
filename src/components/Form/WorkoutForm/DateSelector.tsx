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
    setSelectedObservance(null); // Reset selectedObservance when navigating to another month
  }, [currentDate]); // Re-run when currentDate changes

  // Function to check if a date is a holiday
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
    return date.getDay() === 0; // Sunday corresponds to day 0
  };

  // Function to get an array of days in the current month
  const getDaysInMonth = (year: number, month: number): Date[] => {
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1)
    );
  };

  // Function to navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1)
    );
  };

  // Get the current month and year
  const currentMonth: number = currentDate.getMonth();
  const currentYear: number = currentDate.getFullYear();

  // Get the array of days in the current month
  const daysInMonth: Date[] = getDaysInMonth(currentYear, currentMonth);

  // Determine the day of the week that the month starts on (0 for Sunday, 1 for Monday, etc.)
  const startDayOfWeek: number = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  console.log('startDayOfWeek:', startDayOfWeek);

  // Get the first day of the week with Sunday as 7th day
  const firstDayOfWeek = startDayOfWeek === 0 ? 7 : startDayOfWeek;

  console.log('firstDayOfWeek:', firstDayOfWeek);

  let blankDaysLength =
    startDayOfWeek === 0 || startDayOfWeek === 7 ? 7 : startDayOfWeek - 1;

  // Create an array to represent the blank days at the beginning of the month
  const blankDays: JSX.Element[] = Array.from(
    { length: blankDaysLength },
    (_, index) => <div key={index} className="py-2 text-center"></div>
  );

  // Fill the rest of the array with empty elements if needed
  if (startDayOfWeek === 0 || startDayOfWeek === 7) {
    for (let i = blankDaysLength; i < 7; i++) {
      blankDays.push(<div key={i} className="py-2 text-center"></div>);
    }
  }

  // Inside the DateSelector component
  const handleClick = (description: string | null, day: Date) => {
    // Sprawdź czy data nie jest niedzielą i nie jest narodowym świętem
    if (!isSunday(day) && !isNational(day)) {
      setSelectedObservance((prevDescription) =>
        prevDescription === description ? null : description
      );
  
      setSelectedDay((prevSelectedDay) => {
        // Jeśli wcześniej zaznaczono ten dzień, to odznacz go
        if (prevSelectedDay && prevSelectedDay.toDateString() === day.toDateString()) {
          setShowTimeSelector(false); // Ukryj TimeSelector, gdy data zostanie odznaczona
          return null;
        } else {
          // W przeciwnym razie, przełącz stan na bieżący dzień i pokaż TimeSelector
          setShowTimeSelector(true);
          return day;
        }
      });
    } else {
      // Jeśli data to niedziela lub narodowe święto, zignoruj zaznaczanie daty
      setSelectedObservance(null);
      setSelectedDay(null);
      setShowTimeSelector(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h3 className="text-xl mb-4">Date</h3>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* Calendar Header */}
        <div className="bg-gray-200 px-4 py-3 flex items-center justify-between">
          {/* Previous Month Button */}
          <button className="text-gray-600" onClick={goToPreviousMonth}>
            &lt;
          </button>
          {/* Month and Year */}
          <div className="text-gray-800 font-bold">
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </div>
          {/* Next Month Button */}
          <button className="text-gray-600" onClick={goToNextMonth}>
            &gt;
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {/* Weekday Labels */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="py-2 text-center bg-gray-100">
              {day}
            </div>
          ))}

          {/* Blank Days at the beginning of the month */}
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
      {/* Display description */}
      {selectedObservance && (
        <div className="text-center mt-4 text-gray-700">
          {selectedObservance}
        </div>
      )}
    </div>
  );
};

export default DateSelector;
