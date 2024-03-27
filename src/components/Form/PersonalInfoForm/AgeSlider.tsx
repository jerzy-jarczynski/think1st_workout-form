import React from 'react';

interface AgeSliderProps {
  header: string;
}

const AgeSlider: React.FC<AgeSliderProps> = ({ header }) => {
  return (
    <>
      <h3>{header}</h3>
      <input type="range" min={8} max={100} step={1} defaultValue={8} />
    </>
  );
};

export default AgeSlider;