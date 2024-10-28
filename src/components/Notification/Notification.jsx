import { useEffect } from 'react';
import css from './Notification.module.css'; 

const Notification = ({ message, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const createWaveText = (text) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.2em' }}>
        {word.split('').map((char, charIndex) => (
          <span 
            key={charIndex} 
            className={css.wave} 
            style={{ animationDelay: `${(wordIndex * 0.2) + (charIndex * 0.1)}s` }}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div className={css.notification}>
      <p className={`${css.wave}`}>{createWaveText(message)}</p>
      <button className={css.closeButton} onClick={onClose}>
        &times; 
      </button>
    </div>
  );
};

export default Notification;