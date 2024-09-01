import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors'; 
import css from './UserMenu.module.css';

const UserMenu = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const userName = user ? user.name : '';

  const onLogOut = () => {
    dispatch(logout());
  }

    return (
        <div>
            {isLoggedIn && user ? (
          <button className={css.buttonUser} type="button" onClick={onLogOut}>
            Logout
          </button>
            ): null }
        </div>
    )
};

export default UserMenu;
