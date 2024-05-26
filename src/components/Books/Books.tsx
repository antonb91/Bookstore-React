import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(loadBooks({ limit, currentPage }));
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
    for (let i = 0; i < books.length; i += 3) {
      rows.push(
        <div className='books__row' key={i}>
          {books.slice(i, i + 3).map((book: IBook) => (
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
    <div className="books__container">
      <div className='title__wrapper'>
        <h1 className='books-title'>New Releases Books</h1>
      </div>
      {renderBooks()}
      <div className='books__subscribe-wrapper'>
        <Subscribe className='books-subscribe'/>
      </div>
    </div>
  );
};

export { Books };
