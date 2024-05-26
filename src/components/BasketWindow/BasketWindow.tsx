import './BasketWindow.css'
import { Link } from 'react-router-dom'
import { Arrow } from '../Icons/Arrow'
import { useSelector } from 'react-redux'
import { IStoreState } from '../../types'
import { ICart } from '../../types'

const BasketWindow = () => {
        const cartItems = useSelector((state: IStoreState) => state.books.cart);

        if (!cartItems || cartItems.length === 0) {
            return <div className="basket-window">Cart is empty</div>;
        }
        
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
                <ul>
            {cartItems.map((cart: ICart) => (
            <li key={cart.isbn13}>
                <img src={cart.image} alt={cart.title} />
                <div>{cart.title}</div>
                <div>{cart.price}</div>
                <div>{cart.authors}</div>
            </li>
        ))}
      </ul>
            </p>
        </article>
    )
}

export { BasketWindow }