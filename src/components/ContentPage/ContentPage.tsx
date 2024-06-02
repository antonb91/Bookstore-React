import './ContentPage.css';
import { useParams } from 'react-router-dom'; 
import { IStoreState, ISelectedBook, IFavorites } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadSelectedBook, addToCart, addToFavorites, removeFromFavorites } from '../../redux/actionCreators';
import { Link } from 'react-router-dom';
import { Arrow } from '../Icons/Arrow';
import { Rate } from '../Icons/Rate';
import { Button } from '../Button';
import { Twitter } from '../Icons/Twitter';
import { Facebook } from '../Icons/Facebook';
import { Subscribe } from '../Subscribe';
import { SimilarBooks } from '../Books';
import { ICart } from '../../types';
import { AddToFav } from '../Icons/AddToFav';

const ContentPage = () => {
    const { isbn13 = '' } = useParams(); 
    const selectedBook = useSelector((state: IStoreState) => state.books.selectedBook);
    const favorites = useSelector((state: IStoreState) => state.books.favBook);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('description');
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        dispatch(loadSelectedBook(isbn13));
    }, [isbn13, dispatch]);

    useEffect(() => {
        if (selectedBook && favorites) {
            setIsFavorited(favorites.some(book => book.isbn13 === selectedBook.isbn13));
        }
    }, [selectedBook, favorites]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleFavoriteClick = () => {
        const favBook: IFavorites = {
            isbn13: selectedBook.isbn13,
            title: selectedBook.title,
            price: selectedBook.price,
            authors: selectedBook.authors,
            publisher: selectedBook.publisher,
            image: selectedBook.image
        };

        if (isFavorited) {
            dispatch(removeFromFavorites(selectedBook.isbn13));
        } else {
            dispatch(addToFavorites(favBook));
        }

        setIsFavorited(!isFavorited);
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
                        <div className='fav__wrapper'>
                            <AddToFav 
                                isFavorited={isFavorited} 
                                onClick={handleFavoriteClick} 
                            />
                        </div>
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
                            onClick={() => {
                                const cartItem: ICart = {
                                    isbn13: selectedBook.isbn13,
                                    title: selectedBook.title,
                                    price: selectedBook.price,
                                    authors: selectedBook.authors,
                                    image: selectedBook.image,
                                    quantity: 1
                                };
                                dispatch(addToCart(cartItem));
                            }}
                            children='Add to cart'
                        />
                        <a href={selectedBook.url} className='preview'>Preview Book</a>
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

                <Subscribe className='subscribe__content-page'/>
                <SimilarBooks />
            </p>
        </article>
    );
}

export { ContentPage };
