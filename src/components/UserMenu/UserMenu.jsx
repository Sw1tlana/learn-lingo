import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors'; 
import css from './UserMenu.module.css';

    console.log('User:', user);
    console.log('Is Logged In:', isLoggedIn);

const UserMenu = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();


    const onLogOut = async () => {
    console.log('Logout button clicked');
    try {
        await dispatch(logout()).unwrap();
        console.log('Logout successful');
    } catch (error) {
        console.error('Logout error:', error);
    }
    }

    return (
        <div className={css.userMenu}>
            {isLoggedIn && user ? (
                <div>
                    <button className={css.buttonUser} type="button" onClick={onLogOut}>
                        Logout
                    </button>
                </div>
            ) : (
                <p>Please log in</p>
            )}
        </div>
    )
};

export default UserMenu;
