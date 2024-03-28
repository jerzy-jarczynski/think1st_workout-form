import React, { useState, useEffect, useRef } from 'react';
import '../../../styles/AgeSlider.css';

interface AgeSliderProps {
  header: string;
}

const AgeSlider: React.FC<AgeSliderProps> = ({ header }) => {
  const [value, setValue] = useState<number>(8);
  const [tooltipPosition, setTooltipPosition] = useState<number>(0);
  const rangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rangeRef.current) {
      const rangeSliderWidth = rangeRef.current.offsetWidth - 16;
      const rangeSliderStepCount = 100 - 8; // liczba kroków
      const singleStepSize = rangeSliderWidth / rangeSliderStepCount; // długość jednego kroku w pikselach
      const pixelOffset = (value - 8) * singleStepSize + 8; // Oblicz przesunięcie w pikselach
      setTooltipPosition(pixelOffset); // Ustaw nową pozycję tooltipu
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  return (
    <div className="pb-6 relative">
      <h3>{header}</h3>
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
        value={value}
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
