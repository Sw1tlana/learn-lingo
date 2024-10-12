import { useEffect } from 'react';
import css from './Notification.module.css'; 

const Notification = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={css.notification}>
      <p>{message}</p>
      <button className={css.closeButton} onClick={onClose}>
        &times; 
      </button>
    </div>
  );
};

export default Notification;