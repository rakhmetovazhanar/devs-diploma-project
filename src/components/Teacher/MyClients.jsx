import React from 'react'
import TeacherHeader from './TeacherHeader';
import styles from '../../styles/MyClients.module.css';
import ClientItem from './ClientItem';
import Footer from '../../ui/Footer';

const MyClients = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.wrap_inner}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <TeacherHeader headerTitle={'Мои клиенты'}/>
                    <div className={styles.my_clients}>
                        <h2 className={styles.my_clients_title}>Мои клиенты</h2>
                        <div className={styles.my_clients_content}>
                            <div className={styles.columns}>
                                <p>Студенты</p>
                                <p>Электронная почта</p>
                                <p>Контакты</p>
                                <p>Курс</p>
                                <p>Оплата</p>
                            </div>
                            <span className={styles.line}></span>
                            <ClientItem/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default MyClients;
