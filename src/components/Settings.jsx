import React, {useState, useContext, useEffect} from 'react';
import styles from '../styles/Settings.module.css';
import UserContext from '../components/UserContext';
import TeacherHeader from './Teacher/TeacherHeader';
import StudentHeader from './Student/StudentHeader';

const Settings = () => {
//   const {user} = useContext(UserContext);
  return (
    <div className={styles.wrapper}>
        <div className={styles.wrap_inner}>
            <div className={styles.header}>
                <div className={styles.container}>
                    {/* {user.role==='Репетитор' ? (
                        <TeacherHeader headerTitle={'Настройка'}/>
                    ) : (
                        <StudentHeader headerTitle={'Настройка'}/>
                    )} */}
                    <TeacherHeader headerTitle={'Настройка'}/>

                    <div className={styles.settings_content}>
                        <div className={styles.settings_parts}>
                            <h3>Мой профиль</h3>
                            <h3>Редактировать</h3>
                            <h3>Связаться с нами</h3>
                        </div>
                        <span className={styles.line}></span>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


export default Settings;
