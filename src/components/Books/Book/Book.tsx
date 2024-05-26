import './Book.css';
import { IBook } from '../../../types';
import { Rate } from '../../Icons/Rate';
import { Link } from 'react-router-dom';

const Book = ({ title, subtitle, isbn13, price, image, url, backgroundColor, onClick }: IBook )=> {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='book__wrapper'>
            <Link to={`/books/${isbn13}`} className="link">
                <article className='book-article' onClick={scrollToTop}>
                    <div className='img__container' style={{ backgroundColor }}>
                        <img className='book-img' src={image} alt="img name" />
                    </div>
                    <div className='info__container'>
                        <div className='book-title'>{title}</div>
                        <div className='book-author'>by Lentin Joseph,  Apress 2018</div>
                        <div className='last__container'>
                            <div className='book-price'>{price}</div>
                            <Rate className='book-rate'/>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
}

export { Book };
