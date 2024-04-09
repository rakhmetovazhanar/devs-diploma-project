import React , {useEffect} from 'react';
import styles from '../styles/Modal.module.css';
import {Link} from 'react-router-dom';
import success from '../images/successEnrolled.svg';

const ModalSuccessEnrolled = ({onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          onClose(); 
        }, 2000); 
    
        return () => clearTimeout(timer);
      }, [onClose]);
  return (
    <div className={styles.modalOverlay2} onClick={onClose}>
      <div className={styles.modal2}>
          <div className={styles.modal_inner2}>
              <h2 className={styles.modal_title2}>Вы записались на выбранный курс!</h2>
              <img src={success} alt="done" />
              
          </div>
      </div>
    </div>
  )
}

export default ModalSuccessEnrolled;
