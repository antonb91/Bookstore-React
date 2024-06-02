import './Order.css'
import { Link } from 'react-router-dom';


const Order = () => {
    return (
      <div className='confirmation__page'>
        <div className='confirm__form-wrapper'>
          <div className='confirm__form-innertext'>
            Congratulations!<br/>
            You have successfully placed your order.<br/>
            Delivery is expected within 2 days.
          </div>
          <div className='button_confirm-container'>
            <Link to='/new' className='button_confirm'>    
                Go back shopping
                </Link>
          </div>
        </div>
      </div>
    )
}

export { Order }