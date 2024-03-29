import React, { useEffect, useState } from 'react';
import { useForm } from '../../FormContext';

const SubmitButton: React.FC = () => {
  const [formState] = useForm();
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: '#CBB6E5',
    cursor: 'default',
  });

  useEffect(() => {
    if (formState.isDateSelected) {
      setButtonStyle({
        backgroundColor: '#761BE4',
        cursor: 'pointer',
      });
    } else {
      setButtonStyle({
        backgroundColor: '#CBB6E5',
        cursor: 'default',
      });
    }
  }, [formState.isDateSelected]);

  const handleHover = () => {
    if (formState.isDateSelected) {
      setButtonStyle({
        ...buttonStyle,
        backgroundColor: '#6A19CD',
      });
    }
  };

  const handleHoverExit = () => {
    if (formState.isDateSelected) {
      setButtonStyle({
        ...buttonStyle,
        backgroundColor: '#761BE4',
      });
    }
  };

  return (
    <button
      type="submit"
      disabled={!formState.isDateSelected} // Wyłącz przycisk, gdy data nie jest zaznaczona
      className="mt-8 w-full h-12 text-lg font-medium rounded-md text-white"
      style={buttonStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
    >
      Send application
    </button>
  );
};

export default SubmitButton;
