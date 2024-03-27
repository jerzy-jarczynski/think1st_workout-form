import React, { useState } from 'react';

const TimeSelector: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const timeOptions: string[] = ['12:00', '14:00', '16:00', '18:00', '20:00'];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Time</h3>
      <div className="grid grid-cols-2 gap-2">
        {timeOptions.map((time) => (
          <label
            key={time}
            className={`inline-flex items-center justify-center w-full h-12 px-4 text-lg font-medium border border-gray-300 rounded-md cursor-pointer ${
              selectedTime === time
                ? 'bg-blue-500 text-white'
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
