import React ,{useState} from 'react';
import styles from '../../styles/MyClients.module.css';
import { usePaymentButton } from './PaymentContext';

const ClientItem = () => {
    const { isClickedPayment, togglePayment } = usePaymentButton();

  
  return (
    <div className={styles.clientInfo}>
        <p className={styles.client_name}>Асема Таиирр</p>
        <p className={styles.client_email}>aselmansur@gmail.com</p>
        <p className={styles.client_number}>+7 (701) 45 78 725</p>
        <p className={styles.client_course}>HTML/CSS </p>
        <button className={`${styles.client_payment} ${isClickedPayment ? styles.paid : styles.notPaid}`} onClick={togglePayment}>
          {isClickedPayment ? 'Оплачено' : 'Не оплачено'}
        </button>        
        <button className={styles.client_remove}>Удалить</button>
    </div>
  )
}

export default ClientItem;
