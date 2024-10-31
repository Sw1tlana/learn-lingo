import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors'; 

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
      <div>
          <button onClick={onLogOut}>Logout</button>
      </div>
    ) : null}
  </div>
    );
};

export default UserMenu;