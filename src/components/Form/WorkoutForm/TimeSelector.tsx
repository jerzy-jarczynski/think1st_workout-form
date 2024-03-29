import React, { useState } from 'react';

const TimeSelector: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const timeOptions: string[] = ['12:00', '14:00', '16:00', '18:00', '20:00'];

  return (
    <div className="space-y-2 md:col-start-2 md:col-span-1">
      <h3 className="text-base font-normal pb-2 pt-6 md:pt-0">Time</h3>
      <div className="grid grid-cols-4 md:grid-cols-1 gap-2" style={{ marginTop: 0 }}>
        {timeOptions.map((time) => (
          <label
            key={time}
            className={`inline-flex items-center justify-center w-full h-12 px-4 text-lg font-medium border border-gray-300 rounded-md cursor-pointer ${
              selectedTime === time
                ? 'bg-white border-purple-500 transition duration-300' // Dodanie efektu przejścia
                : 'bg-white text-gray-700'
            }`}
          >
            <input
              type="radio"
              name="time"
              value={time}
              checked={selectedTime === time}
              onChange={() => handleTimeChange(time)}
              className="sr-only"
            />
            {time}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
