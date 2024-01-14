
import React, { useState, ChangeEvent } from 'react';

interface SearchInputProps {
  onSearch: (countryName: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    // Call onSearch immediately when the value changes
    onSearch(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
    </div>
  );
};

export default SearchInput;

