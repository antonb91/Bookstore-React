import './ContentPage.css';
import { useParams } from 'react-router-dom'; 
import { IStoreState, ISelectedBook } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadSelectedBook } from '../../redux/actionCreators';
import { Link } from 'react-router-dom';
import { Arrow } from '../Icons/Arrow';
import { Rate } from '../Icons/Rate';
import { Button } from '../Button';
import { useState } from 'react';
import { Twitter } from '../Icons/Twitter';
import { Facebook } from '../Icons/Facebook';
import { Subscribe } from '../Subscribe';
import { SimilarBooks } from '../Books';

  
const ContentPage = () => {
    const { isbn13 = '' } = useParams(); 
    const selectedBook = useSelector((state: IStoreState) => state.books.selectedBook);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        dispatch(loadSelectedBook(isbn13))
        console.log('Selected book:', selectedBook)
    }, [isbn13, dispatch])

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <article className='content__page-wrapper'>
            <p className='upper__wrapper'>
                <div className='content__page_header'>
                    <div className='content__page_header-menu'>
                        <Link to='/new' className='content__page_header-arrow'>
                            <Arrow />
                        </Link>
                    </div>
                        <h3 className='content__page_header-title'>{selectedBook.title}</h3>
                </div>
                <div className='content__book-info'>
                    <div className='content__img-container'>
                        <img className="content__book-image" src={selectedBook.image} alt="img name" />
                    </div>
                    <div className='content__book-infocard'>
                        <div className='price_rate-row'>
                            <div className='content__book-price'>{selectedBook.price}</div>
                            <Rate className='content__book-rate'/>
                        </div>
                        <div className='author-container'>
                            <div className='author'>Authors:</div>
                            <div className='content__book-author'>{selectedBook.authors}</div>
                        </div>
                        <div className='publisher-container'>
                            <div className='publisher'>Publisher:</div>
                            <div className='content__book-publisher'>{selectedBook.publisher}</div>
                        </div>
                        <div className='year-container'>
                            <div className='year'>Year:</div>
                            <div className='content__book-year'>{selectedBook.year}</div>
                        </div>
                        <div className='page-container'>
                            <div className='page'>Pages:</div>
                            <div className='content__book-page'>{selectedBook.pages}</div>
                        </div>
                        <Button 
                            className='add-btn'
                            onClick={(event: any) => (event)}
                            children='Add to cart'
                         />
                    </div>
                </div>
            </p>

            <p className='middle__wrapper'>
                <div className='tabs'>
                    <button 
                        className={activeTab === 'description' ? 'active' : ''} 
                        onClick={() => handleTabClick('description')}>
                            Description
                    </button>
                    <button 
                        className={activeTab === 'authors' ? 'active' : ''} 
                        onClick={() => handleTabClick('authors')}>
                            Authors
                    </button>
                    <button 
                        className={activeTab === 'reviews' ? 'active' : ''} 
                        onClick={() => handleTabClick('reviews')}>
                            Reviews
                    </button>
                </div>

                <div className='tab-content'>
                    {activeTab === 'description' && <p>{selectedBook.desc}</p>}
                    {activeTab === 'authors' && <p>{selectedBook.authors}</p>}
                    {activeTab === 'reviews' && <p>No reviews available.</p>}
                </div>
                <div className='social__network'>
                    <Link to='https://www.facebook.com/'>
                        <Facebook />
                    </Link>

                    <Link to='https://x.com/?lang=ru'>
                        <Twitter />
                    </Link>
                </div>

                <Subscribe />
                <SimilarBooks />
            </p>

            

        </article>
    )
}

export { ContentPage }