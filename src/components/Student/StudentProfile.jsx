import React, {useEffect, useContext, useState} from 'react';
import styles from '../../styles/StudentProfile.module.css';
import StudentHeader from './StudentHeader';
import profileImg from '../../images/studentsImg.svg';
import line from '../../images/Line 136.svg';
import {Link} from 'react-router-dom';
import Footer from '../../ui/Footer';
import axios from 'axios';
import { UserContext } from '../../components/UserContext';



const StudentProfile = () => {
  const { user } = useContext(UserContext);
  const [studentData, setStudentData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get(`http://134.209.250.123:8000/api/teacher-profile/${user.user_id}`, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching teacher profile:', error);
      }
    };

    fetchTeacherProfile();
  }, [user.user_id]);

  return (
    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
                <StudentHeader headerTitle={'Hi Zhanel'}/>
                {/* MAIN CONTENT */}
                <div className={styles.profile}>
                    <h2 className={styles.profile_title}>Мой профиль</h2>
                    <div className={styles.profile_content}>
                        <div className={styles.profile_content_info}>
                            <img className={styles.user_img} src={profileImg} alt="profile_img" />
                            <img src={line} alt="line" />
                            <div className={styles.profile_user_data}>
                                <h2 className={styles.user_name}>{studentData && studentData.first_name} {studentData && studentData.last_name}</h2>
                                <p className={styles.user_email}>{studentData && studentData.username}</p>
                                {studentData && (
                                <div className={styles.user_contacts}>
                                    <h4>Контакты:  {studentData.phone_number}</h4>
                                    <h4>Город: {studentData.city}</h4>
                                    <h4>Возраст: {studentData.age}</h4>
                                </div>
                                )}
                            </div>
                            <img src={line} alt="line" />
                        </div>

                        <div className={styles.profile_btns}>
                          <Link to='/'><button className={styles.cancel}>Назад</button></Link>
                          <Link to='/student-edit-profile'><button className={styles.to_edit_page}>Редактировать профиль</button></Link>
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

export default StudentProfile;
