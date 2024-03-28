import React from 'react';

interface TextInputProps {
  header: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  state?: 'default' | 'active' | 'error';
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { header, type, value, onChange, state = 'default' } = props;

  const defaultClasses =
    'w-full h-12 px-4 rounded-md border border-solid border-purple-300 text-base font-semibold text-black bg-white transition-all duration-300 focus:outline-none focus:ring-0 focus:border-purple-500';
  const activeClasses =
    'w-full h-12 px-4 rounded-md border-2 border-solid border-purple-500 text-base font-semibold text-black bg-white transition-all duration-300 focus:outline-none focus:ring-0 focus:border-purple-500';
  const errorClasses =
    'w-full h-12 px-4 rounded-md border-2 border-solid border-red-500 text-base font-semibold text-black bg-white transition-all duration-300 focus:outline-none focus:ring-0 focus:border-red-500';

  let inputClasses = defaultClasses;
  if (state === 'active') {
    inputClasses = activeClasses;
  } else if (state === 'error') {
    inputClasses = errorClasses;
  }

  return (
    <div className="pb-6">
      <h3>{header}</h3>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClasses}
      />
    </div>
  );
};

export default TextInput;
