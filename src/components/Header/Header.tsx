import './Header.css';
import { Label } from '../Icons/Label';
import { Search } from '../Search';
import { Like } from '../Icons/Like';
import { Basket } from '../Icons/Basket';
import { User } from '../Icons/User';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState, IUser } from '../../types';
import { Exit } from '../Icons/Exit';
import { setUser } from '../../redux/actionCreators';

const Header = () => {
    const user = useSelector((state: IStoreState) => state.user.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        console.log("User after logout:", user);
        window.location.pathname = '/sign-in';
    };
    console.log(user)
    return ( 
        <div className='header__wrapper'>
            <Link to='/new'> <Label /> </Link>
            <Search />
            <div className='header__icons-wrapper'>
                <Link to='/favorites'> <Like /> </Link>
                <Link to='/basket'> <Basket /> </Link>
                {localStorage.getItem('access') ? (
                    <Exit onClick={handleLogout} />
                ) : (
                    <Link to='/sign-in'> <User /> </Link>
                )}
            </div>
        </div>
    );
};

export { Header };
