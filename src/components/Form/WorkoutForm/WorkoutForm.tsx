import React, { useState } from 'react';
import DateSelector from './DateSelector';

const WorkoutForm = () => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showTimeSelector, setShowTimeSelector] = useState<boolean>(false);
  const [inputState, setInputState] = useState<'default' | 'active' | 'error'>(
    'default'
  );
  const [selectedObservance, setSelectedObservance] = useState<string | null>(
    null
  );

  return (
    <>
      <h2 className="text-xl font-medium pb-8">Your workout</h2>
      <DateSelector
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        showTimeSelector={showTimeSelector}
        setShowTimeSelector={setShowTimeSelector}
        inputState={inputState}
        setInputState={setInputState}
        selectedObservance={selectedObservance}
        setSelectedObservance={setSelectedObservance}
      />
    </>
  );
};

export default WorkoutForm;
