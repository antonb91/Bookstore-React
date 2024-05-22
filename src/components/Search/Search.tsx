import { useState } from 'react';
import './Search.css'
import { SearchIcon } from '../Icons/Search';


const Search = () => {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const handleOnFocus = () => {
        setIsActive(true);
      };

    return (
        <div className='search__wrapper'>
          <input
            className='search_input'
            placeholder={isActive ? 'Search...' : ''}
            onFocus={handleOnFocus}
                    // onChange={(e) => setValue(e.target.value)}
                    // onKeyDown={(e) => {
                    // if (e.key === 'Enter') {
                    //     navigate(`/posts/search-results?search=${value}`);
                    // }
                    // }}
            />
          <SearchIcon />
            
            {/* {value.length !==0 && <CancelIcon onClick = {() => setValue('')} />} */}
        </div>
    )
}

export { Search }