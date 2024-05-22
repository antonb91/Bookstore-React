import './Header.css'
import { Label } from '../Icons/Label'
import { Search } from '../Search'
import { Like } from '../Icons/Like'
import { Basket } from '../Icons/Basket'
import { User } from '../Icons/User'

const Header = () => {
    return (
        <div className='header__wrapper'>
            <Label />
            <Search />
          <div className='header__icons-wrapper'>
                <Like />
                <Basket />
                <User />
          </div>
        </div>
    )
}

export { Header }