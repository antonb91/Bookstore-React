import './BasketWindow.css';
import { Link } from 'react-router-dom';
import { Arrow } from '../Icons/Arrow';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../types';
import { ICart } from '../../types';
import { CancelIcon } from '../Icons/CancelIcon';
import { Minus } from '../Icons/Minus';
import { Plus } from '../Icons/Plus';
import { Button } from '../Button';
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from '../../redux/actionCreators';

const BasketWindow = () => {
    const cartItems = useSelector((state: IStoreState) => state.books.cart);
    const dispatch = useDispatch();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className='empty__wrapper'>
                <div className='empty-basket'>Cart is empty</div>
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

    const handleIncreaseQuantity = (isbn13: number) => {
        dispatch(increaseQuantity(isbn13));
    };

    const handleDecreaseQuantity = (isbn13: number) => {
        dispatch(decreaseQuantity(isbn13));
    };

    const handleRemoveFromCart = (isbn13: number) => {
        dispatch(removeFromCart(isbn13));
    };

    const handleCheckout = () => {
        dispatch(clearCart());
    };

    const cleanPrice = (price: string) => parseFloat(price.replace(/[^0-9.-]+/g, ''));

    const totalSum = cartItems.reduce((sum, item) => {
        const price = cleanPrice(item.price.toString());
        const quantity = item.quantity ?? 1;
        return sum + price * quantity;
    }, 0);

    const vat = (totalSum * 0.1).toFixed(2);
    const total = (totalSum + parseFloat(vat)).toFixed(2);

    return (
        <article className='basket__wrapper'>
            <p className='upper__wrapper'>
                <div className='basket_header'>
                    <div className='basket_header-menu'>
                        <Link to='/new' className='basket_header-arrow'>
                            <Arrow />
                        </Link>
                    </div>
                    <h3 className='basket_header-title'>Your cart</h3>
                </div>
            </p>

            {cartItems.map((cart) => {
                const totalPriceForItem = (cleanPrice(cart.price.toString()) * cart.quantity).toFixed(2);
                return (
                    <div className='item__wrapper' key={cart.isbn13}>
                        <div className='image__basket-wrapper' style={{ backgroundColor: getRandomColor() }}>
                            <img className='image-basket' src={cart.image} alt={cart.title} />
                        </div>
                        <div className='details__wrapper'>
                            <div className='basket__details'>
                                <div className='title__item-wrapper'> 
                                    <Link to={`/books/${cart.isbn13}`} className='title__item-basket' onClick={scrollToTop}>{cart.title}</Link>
                                    <div className='author__item-basket'>{cart.authors}</div>
                                    <div className='plus__minus-wrapper'>
                                        <Minus onClick={() => handleDecreaseQuantity(cart.isbn13)}/>
                                        <div className='count__books'>{cart.quantity}</div>
                                        <Plus onClick={() => handleIncreaseQuantity(cart.isbn13)}/>
                                    </div>
                                </div>
                                <div className='price__wrapper'>
                                    <div className='price__item-basket'>${totalPriceForItem}</div>
                                </div>
                            </div>
                            <div className='cancel__wrapper'>
                                <CancelIcon onClick={() => handleRemoveFromCart(cart.isbn13)}/>
                            </div>
                        </div>
                    </div>
                );
            })}
            <p className='count'>
                <div className='count__wrapper'>
                    <div className='sum__count-wrapper'>
                        <div className='sum-wrapper'>
                            <div className='sum-title'>Sum total</div>
                            <div className='sum'>$ {totalSum.toFixed(2)}</div>
                        </div>
                        <div className='vat-wrapper'>
                            <div className='vat-title'>VAT</div>
                            <div className='vat'>$ {vat}</div>
                        </div>
                        <div className='total-wrapper'>
                            <div className='total-title'>TOTAL</div>
                            <div className='total-sum'>$ {total}</div>
                        </div>
                    </div>
                    <Link to='/order'>
                        <Button
                            className='check__out-button'
                            onClick={handleCheckout}
                            children='CHECK OUT'
                        />
                    </Link>
                </div>
            </p>
        </article>
    );
}

export { BasketWindow }
