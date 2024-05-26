import './Header.css';
import { Label } from '../Icons/Label';
import { Search } from '../Search';
import { Like } from '../Icons/Like';
import { Basket } from '../Icons/Basket';
import { User } from '../Icons/User';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../../types';
import { Exit } from '../Icons/Exit';
import { setUser } from '../../redux/actionCreators';
import { IUser } from '../../types';




const Header = () => {
    const user = useSelector((state: IStoreState) => state.user.user)
    const dispatch = useDispatch()
    return (
        <div className='header__wrapper'>
            <Link to='/new'> <Label /> </Link>
            <Search />
          <div className='header__icons-wrapper'>
                <Like />
                <Link to='/basket'> <Basket /> </Link>
                <Link to='/sign-in'> {!user.id ? <User /> : 
                    <Exit 
                    onClick={() => {
                        localStorage.removeItem('access');
                        localStorage.removeItem('refresh');
                        dispatch(setUser({} as IUser));
                        window.location.pathname = '/sign-in';
                    }} 
                    />} 
                </Link>
          </div>
        </div>
    )
}

export { Header }