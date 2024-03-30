import React, { useRef, useState, useEffect } from 'react';
import { fetchHolidays } from '../../../api';
import { Holiday } from '../../../types';
import TimeSelector from './TimeSelector';
import { useForm } from '../../../FormContext';

interface DateSelectorProps {
  selectedDay: Date | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
  showTimeSelector: boolean;
  setShowTimeSelector: React.Dispatch<React.SetStateAction<boolean>>;
  inputState: 'default' | 'active' | 'error';
  setInputState: React.Dispatch<React.SetStateAction<'default' | 'active' | 'error'>>;
  selectedObservance: string | null;
  setSelectedObservance: React.Dispatch<React.SetStateAction<string | null>>;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDay,
  setSelectedDay,
  showTimeSelector,
  setShowTimeSelector,
  inputState,
  setInputState,
  selectedObservance,
  setSelectedObservance
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, formActions] = useForm();

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setInputState('default');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setInputState]);

  const isHoliday = (date: Date): boolean => {
    return holidays.some((holiday) => new Date(holiday.date).toDateString() === date.toDateString());
  };

  const isNational = (date: Date): boolean => {
    return holidays.some((holiday) => holiday.type === 'national_holiday' && new Date(holiday.date).toDateString() === date.toDateString());
  };

  const isObservance = (date: Date): boolean => {
    return holidays.some((holiday) => holiday.type === 'observance' && new Date(holiday.date).toDateString() === date.toDateString());
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
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1));
  };

  const currentMonth: number = currentDate.getMonth();
  const currentYear: number = currentDate.getFullYear();

  const daysInMonth: Date[] = getDaysInMonth(currentYear, currentMonth);
  const startDayOfWeek: number = new Date(currentYear, currentMonth, 1).getDay();

  let blankDaysLength = startDayOfWeek === 0 || startDayOfWeek === 7 ? 6 : startDayOfWeek - 1;
  const blankDays: JSX.Element[] = Array.from({ length: blankDaysLength }, (_, index) => <div key={index} className="py-2 text-center"></div>);

  if (startDayOfWeek === 0 || startDayOfWeek === 7) {
    for (let i = blankDaysLength; i < 7; i++) {
      blankDays.push(<div key={i} className="py-2 text-center"></div>);
    }
  }

  const handleClick = (description: string | null, day: Date) => {
    if (isSunday(day) && isObservance(day)) {
      setSelectedObservance(description);
      setSelectedDay(null);
      setShowTimeSelector(false);
      setInputState('active');
      formActions.setSelectedDay(null);
    } else if (!isSunday(day) && !isNational(day)) {
      setSelectedObservance((prevDescription) => prevDescription === description ? null : description);
      setSelectedDay((prevSelectedDay) => {
        if (prevSelectedDay && prevSelectedDay.toDateString() === day.toDateString()) {
          setShowTimeSelector(false);
          setInputState('default');
          formActions.setSelectedDay(null);
          return null;
        } else {
          setShowTimeSelector(true);
          setInputState('active');
          formActions.setSelectedDay(day);
          return day;
        }
      });
    } else {
      setSelectedObservance(null);
      setSelectedDay(null);
      setShowTimeSelector(false);
      setInputState('default');
      formActions.setSelectedDay(null);
    }
  };

  return (
    <>
      <div className="md:flex">
        {/* Calendar Column */}
        <div className={`md:w-11/12 ${showTimeSelector ? 'md:w-16/24' : 'md:w-full'}`}>
          <h3 className="text-base font-normal pb-2">Date</h3>
          <div className={`transition-colors ${inputState === 'default' ? 'border border-solid border-purple-300' : inputState === 'active' ? 'border border-solid border-purple-500' : 'border border-solid border-red-500'} bg-white shadow overflow-hidden sm:rounded-lg p-6 md:max-w-[326px]`} ref={containerRef}>
            <div className="px-4 py-3 flex items-center justify-between">
              <button className="text-gray-600 cursor-pointer" onClick={goToPreviousMonth}>
                <img src="/icons/calendar-left.svg" alt="Previous Month" />
              </button>
              <div className="text-gray-800 font-bold">
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
              </div>
              <button className="text-gray-600 cursor-pointer" onClick={goToNextMonth}>
                <img src="/icons/calendar-right.svg" alt="Previous Month" />
              </button>
            </div>

            <div className="grid grid-cols-7">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={index} className={`py-2 text-center font-medium ${index < 7 ? 'text-sm' : ''}`}>
                  {day}
                </div>
              ))}

              {blankDays}

              {daysInMonth.map((day, index) => {
                let backgroundColorClass = '';
                let fontColorClass = '';

                if (isHoliday(day)) {
                  if (isNational(day)) {
                    backgroundColorClass = 'bg-white';
                    fontColorClass = 'text-neutral-400';
                  } else if (isObservance(day)) {
                    backgroundColorClass = 'bg-green-200';
                    if (isSunday(day)) fontColorClass = 'text-neutral-400';
                  }
                } else if (isSunday(day)) {
                  fontColorClass = 'text-neutral-400';
                }

                const holiday = holidays.find((holiday) => new Date(holiday.date).toDateString() === day.toDateString());
                const description = holiday && holiday.type === 'observance' ? `It is Polish ${holiday.name}` : null;

                const isDaySelected = selectedDay && selectedDay.toDateString() === day.toDateString();
                const isSelectedDayStyle = isDaySelected ? 'bg-purple-600 text-white' : '';

                let classNames = `mx-auto text-center rounded-full w-8 h-8 flex items-center justify-center ${backgroundColorClass} ${fontColorClass} ${isSelectedDayStyle}`;
                if (!(isSunday(day) || isNational(day))) {
                  classNames += ' cursor-pointer';
                }

                return (
                  <div key={index} className={classNames} onClick={() => handleClick(description, day)}>
                    {day.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
          {selectedObservance && (
            <div className="mt-1 text-gray-700 text-sm flex items-center">
              <img src="/icons/info.svg" alt="Info" className="mr-1" />
              {selectedObservance}
            </div>
          )}
        </div>
        {/* TimeSelector Column */}
        {showTimeSelector && (
          <div className="md:w-8/24">
            <TimeSelector />
          </div>
        )}
      </div>
    </>
  );
};

export default DateSelector;
