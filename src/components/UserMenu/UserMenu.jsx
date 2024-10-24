import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors'; 
import css from './UserMenu.module.css';

const UserMenu = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const onLogOut = () => {
        console.log('Logout button clicked');
        dispatch(logout());
    };

    return (
  <div>
    {isLoggedIn && user ? (
      <div className={css.containerMenu}>
          <button onClick={onLogOut} className={css.logoutButton}>Logout</button>
      </div>
    ) : null}
  </div>
    );
};

export default UserMenu;