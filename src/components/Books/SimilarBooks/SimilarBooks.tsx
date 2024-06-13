import React, { useEffect, useState } from 'react';
import { Pagination } from '../../Pagination';
import './SimilarBooks.css';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../../types';
import { loadBooks } from '../../../redux/actionCreators';
import { IBook } from '../../../types';
import { Book } from '../Book';

const SimilarBooks = () => {
  const books = useSelector((state: IStoreState) => state.books.books);
  const limit = useSelector((state: IStoreState) => state.books.limit);
  const currentPage = useSelector((state: IStoreState) => state.books.currentPage);
  const total = useSelector((state: IStoreState) => state.books.total);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(loadBooks({ limit, currentPage }));

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderBooks = () => {
    const startIndex = (currentPage - 1) * limit;
    const currentBooks = books.slice(startIndex, startIndex + limit);
    
    if (windowWidth < 450) {
      return (
        <div className="books__row">
          {currentBooks.slice(0, 1).map((book: IBook) => (
            <Book 
              key={book.isbn13}
              title={book.title}
              subtitle={book.subtitle}
              isbn13={book.isbn13}
              price={book.price}
              image={book.image}
              url={book.url}
              backgroundColor={getRandomColor()}
              onClick={scrollToTop}
            />
          ))}
        </div>
      );
    }

    if (windowWidth < 1100) {
      return (
        <div className="books__row">
          {currentBooks.slice(0, 2).map((book: IBook) => (
            <Book 
              key={book.isbn13}
              title={book.title}
              subtitle={book.subtitle}
              isbn13={book.isbn13}
              price={book.price}
              image={book.image}
              url={book.url}
              backgroundColor={getRandomColor()}
              onClick={scrollToTop}
            />
          ))}
        </div>
      );
    }

    if (windowWidth > 1100) {
      return (
        <div className="books__row">
          {currentBooks.slice(0, 6).map((book: IBook) => (
            <Book 
              key={book.isbn13}
              title={book.title}
              subtitle={book.subtitle}
              isbn13={book.isbn13}
              price={book.price}
              image={book.image}
              url={book.url}
              backgroundColor={getRandomColor()}
              onClick={scrollToTop}
            />
        ))}
        </div>
      );
    }
  };

  return (
    <article className='similar__books-wrapper'>
      <div className='first-row'>
        <h1 className='similar-title'>Similar Books</h1>
        {/* <Pagination className='similar-pagination'/> */}
      </div>
      <div className='similar__books-container'>
        {renderBooks()}
      </div>
    </article>
  );
}

export { SimilarBooks };
