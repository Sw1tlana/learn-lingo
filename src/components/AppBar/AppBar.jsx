import css from './AppBar.module.css';
import clsx from 'clsx'; 
import Logo from '../../shared/components/Logo/Logo';
import { NavLink } from "react-router-dom";


const AppBar = () => {
  return (
 <header className={css.header}>
          <NavLink to="/">
              <Logo/>
          </NavLink> 
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
  </header>
  )
}

export default AppBar;
