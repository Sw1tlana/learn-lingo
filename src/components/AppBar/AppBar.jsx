import css from './AppBar.module.css';
import clsx from 'clsx'; 
import { useState } from 'react'; 
import { icons as sprite } from '../../shared/icons';
import Logo from '../../shared/components/Logo/Logo';
import { NavLink } from "react-router-dom";
import ModalWindow from '../../shared/components/ModalWindow/ModalWindow';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import Container from '../../shared/components/Container/Container';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { logout as reduxLogout } from '../../redux/auth/operations';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const AppBar = () => {
  const dispatch = useDispatch();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectUser); 

  const handleLogout = async () => {
    try {
      await dispatch(reduxLogout());
      toast.success('You have logged out successfully!');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  const openLogin = () => setLoginModalOpen(true);
  const closeLogin = () => setLoginModalOpen(false);

  const openRegister = () => setRegisterModalOpen(true);
  const closeRegister = () => setRegisterModalOpen(false);

  return (
    <Container>
      <div className={css.containerHeader}>
        <header className={css.header}>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <nav>
            <NavLink to="/" end className={({ isActive }) => clsx(css.navLink, isActive && css.active)}>
              Home
            </NavLink>
            <NavLink to="/teachers" className={({ isActive }) => clsx(css.navLink, isActive && css.active)}>
              Teachers
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/favorites" className={({ isActive }) => clsx(css.navLink, isActive && css.active)}>
                Favorites
              </NavLink>
            )}
          </nav>
          <div className={css.authButtons}>
            {isLoggedIn && currentUser ? (
              <button onClick={handleLogout} className={css.logoutButton}>Logout</button>
            ) : (
              <>
                <button onClick={openLogin} className={css.loginButton}>
                  <svg width={73} height={20} className={css.iconArrow}>
                    <use xlinkHref={`${sprite}#icon-arrow`} />
                  </svg>
                  Login
                </button>
                <button onClick={openRegister} className={css.registerButton}>Register</button>
              </>
            )}
          </div>
        </header>

        <ModalWindow isOpen={isLoginModalOpen} onClose={closeLogin} className={css.modalLogin}>
          <LoginForm />
        </ModalWindow>

        <ModalWindow isOpen={isRegisterModalOpen} onClose={closeRegister} className={css.modalRegister}>
          <RegistrationForm />
        </ModalWindow>
      </div>
    </Container>
  );
};

export default AppBar;
