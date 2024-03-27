import React from 'react';
import DateSelector from './DateSelector';

const WorkoutForm = () => {
  return (
    <div className="workout-form">
      <h2>Your workout</h2>
      <DateSelector header="Date" />
    </div>
  );
};

export default WorkoutForm;
