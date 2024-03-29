import React from 'react';
import { useForm } from '../../FormContext';

const SubmitButton: React.FC = () => {
  const [, { handleSubmit }] = useForm();

  const handleClick = () => {
    handleSubmit();
  };

  return (
    <button
      type="submit"
      onClick={handleClick}
      className="mt-8 md:mt-12 w-full h-12 text-lg font-medium rounded-md bg-purple-300 flex items-center justify-center"
      style={{ color: '#FFFFFF' }}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
