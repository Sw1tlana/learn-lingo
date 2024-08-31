import css from './AppBar.module.css';
import clsx from 'clsx'; 
import { useContext, useState  } from 'react'; 
import Logo from '../../shared/components/Logo/Logo';
import { AuthContext } from '../../context/AuthContext';
import { NavLink } from "react-router-dom";
import ModalWindow from '../../shared/components/ModalWindow/ModlWindow';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm';


const AppBar = () => {
    const { currentUser, logout  } = useContext(AuthContext);

    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

      const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const openLogin = () => setLoginModalOpen(true);
  const closeLogin = () => setLoginModalOpen(false);

  const openRegister = () => setRegisterModalOpen(true);
  const closeRegister = () => setRegisterModalOpen(false);
    
    return (
    <>
    <header className={css.header}>
          <NavLink to="/">
              <Logo/>
          </NavLink> 
          <nav>
          <NavLink to="/" end className={
              ({ isActive }) => clsx(css.navLink,
                  isActive && css.active)}>
              Home
          </NavLink>
          <NavLink to="/teachers" className={
              ({ isActive }) => clsx(css.navLink,
                  isActive && css.active)}>
             Teachers
          </NavLink>
          </nav>
        <div className={css.authButtons}>
        {currentUser ? (
          <button onClick={handleLogout} className={css.logoutButton}>Logout</button>
        ) : (
          <>
            <button onClick={openLogin} className={css.loginButton}>Login</button>
            <button onClick={openRegister} className={css.registerButton}>Register</button>
          </>
        )}
      </div>
      </header>
      
    <ModalWindow isOpen={isLoginModalOpen} onClose={closeLogin}>
        <LoginForm />
    </ModalWindow>

    <ModalWindow isOpen={isRegisterModalOpen} onClose={closeRegister}>
        <RegistrationForm />
    </ModalWindow>
    </>
  )
}

export default AppBar;
