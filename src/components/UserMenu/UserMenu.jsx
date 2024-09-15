import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors'; 
import css from './UserMenu.module.css';
// import { useEffect } from 'react';

const UserMenu = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const onLogOut = () => {
        console.log('Logout button clicked');
        dispatch(logout());
    };
    
    // useEffect(() => {
    //     console.log('User:', user);
    //     console.log('Is Logged In:', isLoggedIn);
    // }, [isLoggedIn, user]);

    return (
  <div>
    {isLoggedIn && user ? (
      <div className={css.containerMenu}>
        <button className={css.buttonUser} type="button" onClick={onLogOut}>
          Logout
        </button>
      </div>
    ) : null}
  </div>
    );
};

export default UserMenu;