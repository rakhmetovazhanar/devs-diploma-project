import React ,{useState, useEffect} from 'react';
import styles from '../../styles/MyClients.module.css';
import { usePaymentButton } from './PaymentContext';
import axios from 'axios';

const ClientItem = ({client, courseId,setClientsList,clientsList}) => {
  const { clientPaymentStates, togglePayment } = usePaymentButton();
    const course_id = parseInt(courseId);

    const isClickedPayment = clientPaymentStates[client.id] || false;
   
      const deleteClient = async (clientId) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.delete(`http://134.209.250.123:8000/api/delete-client/${clientId}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
            data:{course_id},
          });
          setClientsList(prevClients => prevClients.filter(client => client.id !== clientId));
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
  
  
  
  return (
    <div className={styles.clientInfo}>
        <p className={styles.client_name}>{client.first_name} {client.last_name}</p>
        <p className={styles.client_email}>{client.username}</p>
        <p className={styles.client_number}>{client.phone_number}</p>
        <button className={`${styles.client_payment} ${isClickedPayment ? styles.paid : styles.notPaid}`} onClick={() => togglePayment(client.id)}>
          {isClickedPayment ? 'Оплачено' : 'Не оплачено'}
        </button>        
        <button onClick={()=> deleteClient(client.id)} className={styles.client_remove}>Удалить</button>
    </div>
  )
}

export default ClientItem;
