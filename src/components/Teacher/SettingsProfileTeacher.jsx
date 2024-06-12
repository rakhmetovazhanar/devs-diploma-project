import React, {useState, useContext, useEffect} from 'react';
import styles from '../../styles/TeacherSettings.module.css';
import { UserContext } from '../UserContext';
import def from '../../images/defaultProfImg.jpg';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const SettingsProfileTeacher = () => {
    const { user, setUser } = useContext(UserContext);
    const [teacherData, setTeacherData] = useState(null);
    const token = localStorage.getItem('token');
    const history = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacherProfile = async () => {
          try {
            const response = await axios.get(`https://134.209.250.123:8000/api/teacher-profile/${user.user_id}`, {
              headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
              }
            });
            setTeacherData(response.data);
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

      const handleLogout = async () => {
        try {
          if (!token) {
            console.error('Token is missing'); 
            return;
          }
    
          const response = await axios.post('https://134.209.250.123:8000/api/logout/', null, {
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

      const deleteTeacher = async () => {
        try {
          const response = await axios.delete(`https://134.209.250.123:8000/api/delete-teacher-profile/${user.user_id}`, {
            headers: {
              Authorization: `Token ${token}`,
             'Content-Type' : 'application/json'
            }
          });
          console.log('Teacher deleted successfully');
          setUser(null);
          history('/login')
        } catch (error) {
          console.error('Error deleting teacher:', error);
        }
      };


  return (
    <div className={styles.profile_content}>
      {loading ? ( // Если идет загрузка, отображаем анимацию загрузки
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        ) : ( 
        <div className={styles.profile_content_info}>
        {teacherData && teacherData.profile_picture ? (
            <img className={styles.user_img} src={`https://134.209.250.123:8000${teacherData.profile_picture}`} alt="Profile" />
        ) : (
            <img className={styles.user_img} src={def} alt="profile_img" />
        )}

        <div className={styles.profile_user_data}>
            <div className={styles.user_name_email}>
                <h2 className={styles.user_name}>{teacherData && teacherData.first_name} {teacherData && teacherData.last_name}</h2>
                <p className={styles.user_email}>{teacherData && teacherData.username}</p>
            </div>
            {teacherData && (
            <>
            <div className={styles.user_contacts_message}>
                <div className={styles.user_age_exp}>
                    <h4>Возраст: {teacherData.age}</h4>
                    <h4>Опыт: {teacherData.experience}</h4>
                </div>
                <div className={styles.user_city_contacts}>
                    <h4>Город:  {teacherData.city}</h4>
                    <h4>Контакты:   {teacherData.phone_number}</h4>
                </div>
            </div>
            <p className={styles.user_message}>{teacherData.bio}</p>
            </>
        )}
            <div className={styles.btns}>
                <button onClick={handleLogout} className={styles.logoutBtn}>Выйти</button>
                <button onClick={deleteTeacher} className={styles.deleteAccBtn}>Удалить аккаунт</button>
            </div>
        </div>
        </div>
        )}
    </div>
  )
}

export default SettingsProfileTeacher;
