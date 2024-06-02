import { useEffect, useState } from 'react';
import './Books.css';
import { useSelector, useDispatch } from 'react-redux';
import { loadBooks } from '../../redux/actionCreators';
import { Book } from './Book/Book';
import { IBook, IStoreState } from '../../types';
import { Pagination } from '../Pagination';
import { Subscribe } from '../Subscribe';

const Books = () => {
  const books = useSelector((state: IStoreState) => state.books.books);
  const limit = useSelector((state: IStoreState) => state.books.limit);
  const currentPage = useSelector((state: IStoreState) => state.books.currentPage);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(loadBooks({ limit, currentPage}));
  
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [limit, currentPage, dispatch]);

  const colors = [
    'rgba(215, 228, 253, 1)',
    'rgba(254, 233, 226, 1)',
    'rgba(244, 238, 253, 1)'
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderBooks = () => {
    const rows = [];
    let itemsPerRow;

    if (windowWidth < 438) {
      itemsPerRow = 1;
    } else if (windowWidth < 850) {
      itemsPerRow = 2;
    } else {
      itemsPerRow = 3;
    }

    for (let i = 0; i < books.length; i += itemsPerRow) {
      rows.push(
        <div className='books__row' key={i}>
          {books.slice(i, i + itemsPerRow).map((book: IBook) => (
            <Book 
              key={book.isbn13}
              title={book.title}
              subtitle={book.subtitle}
              isbn13={book.isbn13}
              price={book.price}
              image={book.image}
              url={book.url}
              backgroundColor={getRandomColor()}
            />
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className='books__container'>
      <div className='title__wrapper'>
        <h1 className='books-title'>New Releases Books</h1>
      </div>
      {renderBooks()}
      <div className='books__subscribe-wrapper'>
        <Pagination />
        <Subscribe className='books-subscribe'/>
      </div>
    </div>
  );
};

export { Books };
