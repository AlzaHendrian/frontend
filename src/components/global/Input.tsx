import React from 'react';

interface InputProps {
  id: string;
  name: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${className}`}
    />
  );
};

export default Input;
