import React, {useEffect, useContext, useState} from 'react';
import styles from '../../styles/StudentProfile.module.css';
import StudentHeader from './StudentHeader';
import def from '../../images/defaultProfImg.jpg';
import line from '../../images/Line 136.svg';
import {Link} from 'react-router-dom';
import Footer from '../../ui/Footer';
import axios from 'axios';
import { UserContext } from '../../components/UserContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const StudentProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [studentData, setStudentData] = useState(null);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get(`https://genuis.tech/api/teacher-profile/${user.user_id}`, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setStudentData(response.data);
        setLoading(false);
        setUser(prevUser => ({
          ...prevUser,
          // ...response.data,
          profile_picture: response.data.profile_picture ? decodeURIComponent(response.data.profile_picture) : null
        }));
      } catch (error) {
        console.error('Error fetching teacher profile:', error);
        setLoading(false);
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
                {loading ? ( // Если идет загрузка, отображаем анимацию загрузки
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                  </Box>
                ) : ( 
                <div className={styles.profile}>
                    <h2 className={styles.profile_title}>Мой профиль</h2>
                    <div className={styles.profile_content}>
                        <div className={styles.profile_content_info}>
                        {studentData && studentData.profile_picture ? (
                            <img className={styles.user_img} src={`https://genuis.tech${studentData.profile_picture}`} alt="Profile" />
                        ) : (
                            <img className={styles.user_img} src={def} alt="profile_img" />
                        )}
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
                )}
            </div>
            <Footer/>
        </div>
                  
        </div>
        
    </div>
  )
}

export default StudentProfile;
