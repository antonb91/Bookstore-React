import { useState } from 'react';
import './Search.css'
import { CancelIcon } from '../Icons/CancelIcon';
import { SearchIcon } from '../Icons/Search';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState('');

  const navigate = useNavigate();

  const handleClearSearch = () => {
    setValue('');
    setIsActive(false);
  };

  return (
    <div className='search__wrapper'>
      <input
        className={`search_input ${isActive ? 'search_input-active' : ''}`}
        placeholder={isActive ? 'Search...' : ''}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            navigate(`/books/search-results?search=${value}`);
          }
        }}
        onFocus={() => setIsActive(true)}
      />
      {isActive && value && (
        <CancelIcon onClick={handleClearSearch} />
      )}
    </div>
  );
};

export { Search }
