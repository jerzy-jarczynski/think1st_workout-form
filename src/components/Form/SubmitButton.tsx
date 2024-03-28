import React from 'react';
import { useForm } from '../../FormContext';

const SubmitButton: React.FC = () => {
  const [, { handleSubmit }] = useForm();

  const handleClick = () => {
    handleSubmit();
  };

  return (
    <button type="submit" onClick={handleClick}>
      Submit
    </button>
  );
};

export default SubmitButton;
