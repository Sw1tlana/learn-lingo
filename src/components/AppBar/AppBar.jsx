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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prevState => !prevState); 
  };

  return (
    <Container>
      <header className={css.containerHeader}>
        <div className={css.containerLogo}>
          <NavLink to="/">
            <Logo />
          </NavLink>
          </div>
          <div className={css.burgerButton} onClick={toggleMobileMenu}>
            <div className={`${css.burgerLine} ${isMobileMenuOpen ? css.active : ''}`} />
            <div className={`${css.burgerLine} ${isMobileMenuOpen ? css.active : ''}`} />
            <div className={`${css.burgerLine} ${isMobileMenuOpen ? css.active : ''}`} />
          </div>
        <nav className={clsx(css.nav, isMobileMenuOpen && css.open)}>
        <div className={css.navigationPage}>
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
        </div>
          {!isLoggedIn && (
            <div className={css.navigationPage}>
              <button onClick={openLogin} className={css.loginButton}>
              <svg width={73} height={20} className={css.iconArrow}>
                    <use xlinkHref={`${sprite}#icon-arrow`} />
              </svg>
                Login
              </button>
              <button onClick={openRegister} className={css.registerButton}>
                Register
              </button>
            </div>
          )}
          {isLoggedIn && currentUser && (
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          )}
        </nav>
        <ModalWindow isOpen={isLoginModalOpen} onClose={closeLogin} className={css.modalLogin}>
          <LoginForm />
        </ModalWindow>

        <ModalWindow isOpen={isRegisterModalOpen} onClose={closeRegister} className={css.modalRegister}>
          <RegistrationForm />
        </ModalWindow>
      </header>
    </Container>
  );
};

export default AppBar;
