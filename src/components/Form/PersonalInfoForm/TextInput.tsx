import React from 'react';

interface TextInputProps {
  header: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { header, type, value, onChange } = props;
  return (
    <>
      <h3>{header}</h3>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </>
  );
};

export default TextInput;