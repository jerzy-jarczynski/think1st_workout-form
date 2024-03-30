import React, { useState, useEffect, useRef } from 'react';
import '../../../styles/AgeSlider.css';
import { useForm } from '../../../FormContext';

interface AgeSliderProps {
  header: string;
}

const AgeSlider: React.FC<AgeSliderProps> = ({ header }) => {
  const [value, setValue] = useState<number>(8);
  const [tooltipPosition, setTooltipPosition] = useState<number>(8);
  const [prevValue, setPrevValue] = useState<number>(8);
  const rangeRef = useRef<HTMLInputElement>(null);

  const [, formActions] = useForm();

  useEffect(() => {
    if (rangeRef.current && value !== prevValue) {
      const rangeSliderWidth = rangeRef.current.offsetWidth - 16;
      const rangeSliderStepCount = 100 - 8;
      const singleStepSize = rangeSliderWidth / rangeSliderStepCount;
      const pixelOffset = (value - 8) * singleStepSize + 8;
      setTooltipPosition(pixelOffset);

      formActions.setAge(value);
      setPrevValue(value);
    }
  }, [value, formActions, prevValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
  };

  return (
    <div className="pt-6 pb-20 relative">
      <h3 className="text-base font-normal pb-2">{header}</h3>
      <div className="labels">
        <span className="label">8</span>
        <span className="label">100</span>
      </div>
      <input
        ref={rangeRef}
        type="range"
        min={8}
        max={100}
        step={1}
        value={value.toString()}
        className="range"
        onChange={handleInputChange}
      />
      <div className="tooltip" style={{ left: `${tooltipPosition}px` }}>
        {value}
      </div>
    </div>
  );
};

export default AgeSlider;
