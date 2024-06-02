import { useState } from 'react';
import './Search.css';
import { CancelIcon } from '../Icons/CancelIcon';
import { SearchIcon } from '../Icons/Search';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [isActive, setIsActive] = useState(false);
  const [search, setValue] = useState('');

  const navigate = useNavigate();

  const handleClearSearch = () => {
    setValue('');
    setIsActive(false);
  };

  const handleSearch = () => {
    navigate(`/search-results?search=${search}`);
  };

  return (
    <div className='search__wrapper'>
      <input
        className={`search_input ${isActive ? 'search_input-active' : ''}`}
        placeholder={isActive ? 'Search...' : ''}
        value={search}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        onFocus={() => setIsActive(true)}
        onBlur={() => {
          setTimeout(() => {
            if (search === '') {
              setIsActive(false);
            }
          }, 200);
        }}
      />
      <div className='icons'>
        {!isActive && (
          <SearchIcon />
        )}
        {isActive && search && (
          <CancelIcon onClick={handleClearSearch} />
        )}
      </div>
    </div>
  );
};

export { Search };
