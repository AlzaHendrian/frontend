import React, { useState } from 'react';

interface Option {
  id: number;
  gender: string;
}

interface DropdownProps {
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const DropdownInput: React.FC<DropdownProps> = ({ selectedValue, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const options: Option[] = [
    { id: 1, gender: 'Man' },
    { id: 2, gender: 'Woman' },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        className="flex justify-between items-center pl-4 w-full py-2 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onClick={toggleDropdown}
      >
        {selectedValue || placeholder}
        <svg
          className="w-5 h-5 absolute top-1/2 right-3 -mt-1 transform -translate-y-1/2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-1">
            {options.map(option => (
              <li
                key={option.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => selectOption(option.gender)}
              >
                {option.gender}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
