import './Favorites.css';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState, IFavorites } from '../../types';
import { Link } from 'react-router-dom';
import { Arrow } from '../Icons/Arrow';
import { AddToFav } from '../Icons/AddToFav';
import { removeFromFavorites } from '../../redux/actionCreators';

const Favorites = () => {
    const favItems = useSelector((state: IStoreState) => state.books.favBook);
    const dispatch = useDispatch();

    if (!favItems || favItems.length === 0) {
        return (
            <div className='empty__wrapper'>
                <div className='empty-fav'>There are no favorite books yet.</div>
            </div>
        );
    }

    const colors = [
        'rgba(215, 228, 253, 1)',
        'rgba(254, 233, 226, 1)',
        'rgba(244, 238, 253, 1)'
    ];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleFavoriteClick = (isbn13: number) => {
        dispatch(removeFromFavorites(isbn13));
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <article className='favorites__wrapper' onClick={scrollToTop}>
            <p className='upper__wrapper'>
                <div className='fav_header'>
                    <div className='fav_header-menu'>
                        <Link to='/new' className='fav_header-arrow'>
                            <Arrow />
                        </Link>
                    </div>
                    <h3 className='fav_header-title'>Favorites</h3>
                </div>
            </p>
            {favItems.map((favBook) => (
                <div key={favBook.isbn13} className='favorites__item'>
                    <div className='image__fav-wrapper' style={{ backgroundColor: getRandomColor() }}>
                        <img src={favBook.image} alt={favBook.title} />
                    </div>
                    <div className='details__wrapper'>
                        <div className='favorites__details'>
                            <Link to={`/books/${favBook.isbn13}`} className='title__item-fav'>{favBook.title}</Link>
                            <div className='author__publisher_price-wrapper'>
                                <div className='author__item-fav'>{favBook.authors}</div>
                                <div className='publisher__item-fav'>{favBook.publisher}</div>
                                <div className='price__item-fav'>{favBook.price}</div>
                            </div>
                        </div>
                        <div className='fav__cancel-wrapper'>
                                <AddToFav 
                                    isFavorited={true} 
                                    onClick={() => handleFavoriteClick(favBook.isbn13)} />
                        </div>
                    </div>
                </div>
            ))}
        </article>
    );
}

export { Favorites };
