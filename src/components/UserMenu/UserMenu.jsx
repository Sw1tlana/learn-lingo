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
        const resultAction = await dispatch(logout());
        if (logout.fulfilled.match(resultAction)) {
            console.log('Logout successful');
        } else {
            console.error('Logout failed:', resultAction.error.message);
        }
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
