import React from 'react';

interface AgeSliderProps {
  header: string;
}

const AgeSlider: React.FC<AgeSliderProps> = ({ header }) => {
  return (
    <div className='pb-6'>
      <h3>{header}</h3>
      <input type="range" min={8} max={100} step={1} defaultValue={8} />
    </div>
  );
};

export default AgeSlider;