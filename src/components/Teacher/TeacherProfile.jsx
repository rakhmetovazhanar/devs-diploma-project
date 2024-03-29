import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/TeacherProfile.module.css';
import {Link} from 'react-router-dom';
import { UserContext } from '../../components/UserContext';
import Footer from '../../ui/Footer';
import axios from 'axios';
import TeacherHeader from './TeacherHeader';
import profileImg from '../../images/studentsImg.svg';
import profileLine from '../../images/profileLine.svg';
import student from '../../images/student.svg';
import computer from '../../images/computer.svg';
import doc from '../../images/doc.svg';



const TeacherProfile = () => {
  const { user } = useContext(UserContext);
  const [teacherData, setTeacherData] = useState(null);
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
        setTeacherData(response.data);
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
                <TeacherHeader headerTitle={`Привет ${user.first_name}`}/>    
                {/* MAIN CONTENT */}
                <div className={styles.profile}>
                  <h2 className={styles.profile_title}>Мой профиль</h2>
                  <div className={styles.profile_content}>
                    <div className={styles.profile_content_info}>
                      
                    {teacherData && teacherData.profile_picture ? (
                        <img className={styles.user_img} src={URL.createObjectURL(teacherData.profile_picture)} alt="Profile" />
                    ) : (
                        <img className={styles.user_img} src={profileImg} alt="profile_img" />
                    )}
                      <div className={styles.profile_user_data}>
                        <h2 className={styles.user_name}>{teacherData && teacherData.first_name} {teacherData && teacherData.last_name}</h2>
                        <p className={styles.user_email}>{teacherData && teacherData.username}</p>
                        {teacherData && (
                          <div className={styles.user_contacts_message}>
                            <div className={styles.user_contacts}>
                              <h4>Контакты:   {teacherData.phone_number}</h4>
                              <h4>Город:  {teacherData.city}</h4>
                              <h4>Опыт: {teacherData.experience}</h4>
                              <h4>Возраст: {teacherData.age}</h4>
                            </div>
                            <p className={styles.user_message}>{teacherData.bio}</p>
                          </div>
                        )}
                        <div className={styles.profile_btns}>
                          <Link to='/teacher-edit-page'><button className={styles.to_edit_page}>Редактировать профиль</button></Link>
                          <Link to='/add-course'><button className={styles.to_add_course_btn}>Добавить курс</button></Link>
                        </div>  
                      </div>
                    </div>
                    <div className={styles.profile_statistics}>
                          <div className={styles.user_students}>
                            <img src={student} alt="student" />
                            <div>
                              <h3>70</h3>
                              <h4>Студенты</h4>
                            </div>
                          </div>
                          <img src={profileLine} alt="line" />
                          <div className={styles.user_courses}>
                            <img src={computer} alt="student" />
                            <div>
                              <h3>10</h3>
                              <h4>Курсы</h4>
                            </div>
                          </div>
                          <img src={profileLine} alt="line" />
                          <div className={styles.user_feedbacks}>
                            <img src={doc} alt="student" />
                            <div>
                              <h3>60</h3>
                              <h4>Отзывы</h4>
                            </div>
                          </div>
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

export default TeacherProfile;
