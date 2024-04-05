import React from 'react';
import styles from '../styles/Modal.module.css';
import {Link} from 'react-router-dom';

const ModalToLogin = ({onClose}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal}>
          <div className={styles.modal_inner}>
              <h2 className={styles.modal_title}>Чтобы записаться на курс <br/> вам необходимо войти в систему</h2>
              <div className={styles.btns}>
                  <button className={styles.cancel}>Отмена</button>
                  <Link to='/login'><button className={styles.login_btn}>Войти</button></Link>
              </div>
          </div>
      </div>
    </div>
  )
}

export default ModalToLogin;
