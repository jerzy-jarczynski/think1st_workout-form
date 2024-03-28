import React from 'react';
import { useForm } from '../../FormContext';

const SubmitButton: React.FC = () => {
  const [, { handleSubmit }] = useForm();

  const handleClick = () => {
    handleSubmit();
  };

  return (
    <button type="submit" onClick={handleClick} className="mt-8">
      Submit
    </button>
  );
};

export default SubmitButton;
