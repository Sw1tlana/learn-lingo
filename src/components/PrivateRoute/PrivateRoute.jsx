import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, redirectTo = "/users" }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

     console.log('Is user logged in:', isLoggedIn);
    return isLoggedIn ? children : <Navigate to={redirectTo} replace/>;
}

export default PrivateRoute;