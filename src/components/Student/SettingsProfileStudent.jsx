import React, {useState, useContext, useEffect} from 'react';
import styles from '../../styles/TeacherSettings.module.css';
import { UserContext } from '../UserContext';
import def from '../../images/defaultProfImg.jpg';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SettingsProfileStudent = () => {
    const { user, setUser } = useContext(UserContext);
    const [studentData, setStudentData] = useState(null);
    const token = localStorage.getItem('token');
    const history = useNavigate();

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
            setUser(prevUser => ({
              ...prevUser,
              profile_picture: response.data.profile_picture ? decodeURIComponent(response.data.profile_picture) : null
            }));
          } catch (error) {
            console.error('Error fetching teacher profile:', error);
          }
        };
    
        fetchTeacherProfile();
      }, [user.user_id]);

      const handleLogout = async () => {
        try {
          if (!token) {
            console.error('Token is missing'); 
            return;
          }
    
          const response = await axios.post('http://134.209.250.123:8000/api/logout/', null, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (response.status === 200) {
            setUser(null);
            localStorage.removeItem('token');
            console.log('Logged out successfully');
            history('/login');
          } else {
            console.error('Logout failed:', response.data); 
          }
        } catch (error) {
          console.error('Logout failed:', error); 
        }
      };

      const deleteStudent = async () => {
        try {
          const response = await axios.delete(`http://134.209.250.123:8000/api/delete-student-profile/${user.user_id}`, {
            headers: {
              Authorization: `Token ${token}`,
             'Content-Type' : 'application/json'
            }
          });
          console.log('Student deleted successfully');
          setUser(null);
          history('/login')
        } catch (error) {
          console.error('Error deleting student:', error);
        }
      };


  return (
    <div className={styles.profile_content}>
        <div className={styles.profile_content_info}>
        {studentData && studentData.profile_picture ? (
            <img className={styles.user_img} src={`http://134.209.250.123:8000${studentData.profile_picture}`} alt="Profile" />
        ) : (
            <img className={styles.user_img} src={def} alt="profile_img" />
        )}

        <div className={styles.profile_user_data}>
            <div className={styles.user_name_email}>
                <h2 className={styles.user_name}>{studentData && studentData.first_name} {studentData && studentData.last_name}</h2>
                <p className={styles.user_email}>{studentData && studentData.username}</p>
            </div>
            {studentData && (
            <>
            <div className={styles.user_contacts_message}>
                <div className={styles.user_age_exp}>
                    <h4>Возраст: {studentData.age}</h4>
                    <h4>{user.role}</h4>
                </div>
                <div className={styles.user_city_contacts}>
                    <h4>Город:  {studentData.city}</h4>
                    <h4>Контакты:   {studentData    .phone_number}</h4>
                </div>
            </div>
            </>
        )}
            <div className={styles.btns}>
                <button onClick={handleLogout} className={styles.logoutBtn}>Выйти</button>
                <button onClick={deleteStudent} className={styles.deleteAccBtn}>Удалить аккаунт</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default SettingsProfileStudent;
