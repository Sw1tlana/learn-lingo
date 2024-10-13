import './ModalWindow.css';
import { icons as sprite } from "../../icons/index";
import Modal from 'react-modal';
import { useEffect } from 'react';

const ModalWindow = ({ children, isOpen, onClose, size, className }) => {
  Modal.setAppElement('#root');
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { 
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); 
      document.body.classList.remove('no-scroll');
    }
  }, [onClose, isOpen]); 

  const sizeClass = size === 'small' ? 'modal-content-small' :
                    size === 'medium' ? 'modal-content-medium' :
                    size === 'large' ? 'modal-content-large' : '';
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="modal-overlay"
      className={`modal-content ${sizeClass} ${className}`} 
    >
      <button onClick={onClose} className="modalClose">
        <svg className="iconClose">
          <use xlinkHref={`${sprite}#icon-close`} />
        </svg> 
      </button> 
      {children}
    </Modal>
  );
};

export default ModalWindow;