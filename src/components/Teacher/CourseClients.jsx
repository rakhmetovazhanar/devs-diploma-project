import React, {useState, useContext, useEffect} from 'react'
import TeacherHeader from './TeacherHeader';
import styles from '../../styles/MyClients.module.css';
import ClientItem from './ClientItem';
import Footer from '../../ui/Footer';
import { UserContext } from '../UserContext';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const CourseClients = () => {
  const {user} = useContext(UserContext);
  const {courseId} =useParams();
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://genuis.tech/api/clients/${courseId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setClientsList(response.data)
        console.log(response.data)
        
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchClient();
  }, []); 


  
  return (
    <div className={styles.wrapper}>
        <div className={styles.wrap_inner}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <TeacherHeader headerTitle={`Привет ${user.first_name}`}/>
                    <div className={styles.my_clients}>
                        <h2 className={styles.my_clients_title}>Мои клиенты</h2>
                        <div className={styles.my_clients_content}>
                            <div className={styles.columns}>
                                <p>Студенты</p>
                                <p>Электронная почта</p>
                                <p>Контакты</p>
                                <p>Оплата</p>
                            </div>
                            <span className={styles.line}></span>
                            <div className={styles.client_item}>
                                {clientsList.map((client, index)=>(
                                    <ClientItem key={index} client={client} courseId={courseId} clientsList={clientsList} setClientsList={setClientsList}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default CourseClients;
