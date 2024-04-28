import React, {useEffect, useState} from 'react';
import styles from '../../styles/CreateMeeting.module.css';
import TeacherHeader from './TeacherHeader';
import Footer from '../../ui/Footer';
import axios from 'axios';
import {Link} from 'react-router-dom';

const CreateMeeting = () => {
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    const [isLinkVisible, setIsLinkVisible] = useState(false);

    useEffect(() => {
        const fetchCourseNames = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://134.209.250.123:8000/api/get-teacher-courses/', {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
            setTeacherCourses(response.data);
            console.log(response.data)
    
          } catch (error) {
            console.error('Error fetching courses:', error);
          }
        };
    
        fetchCourseNames();
      }, []); 

      const handleClickOutside = () => {
        setIsLinkVisible(false); 
      };

      const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
      }

      const handleCreateMeeting = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(`http://134.209.250.123:8000/api/create-video-conference/${selectedCourse}`, {
            courseId: selectedCourse // Или другие параметры, необходимые для создания конференции
          }, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          const sessionId = response.data.conference; // Идентификатор сессии
          const meetingLink = `http://134.209.250.123:8000/meeting/${sessionId}`;
          setMeetingLink(meetingLink);
          setIsLinkVisible(true)
          console.log(meetingLink)
        } catch (error) {
          console.error('Error creating meeting:', error);
        }
      };

      const handleCopyLink = () => {
        navigator.clipboard.writeText(meetingLink)
          .then(() => {
            alert('Ссылка скопирована!');
          })
          .catch((error) => {
            console.error('Ошибка копирования ссылки:', error);
          });
      };

  return (
    <div className={styles.wrapper} onClick={handleClickOutside}>
        <div className={styles.wrap_inner}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <TeacherHeader headerTitle={'Видеоконференция'}/>

                    <div className={styles.meeting} >
                        <div className={styles.inner_meeting}>
                            <h2 className={styles.meeting_title}>
                            Безопасная Видеоконференция для всех
                            </h2>
                            <p className={styles.meeting_subtitle}>Получите ссылку на специальные занятия</p>
                            <div className={styles.chooseCourse}>
                                <label>
                                    Название вашего курса
                                </label>
                                <select className={styles.courseDropdown}  onChange={handleCourseChange}>
                                    <option value="">Выбирать</option>
                                    {teacherCourses.map(course => (
                                        <option key={course.id} value={course.id}>{course.name}</option>
                                    ))}
                                            
                                </select>
                            </div>
                            <div className={styles.btn}>
                                <button className={styles.createBtn} 
                                onClick={handleCreateMeeting}
                                >Создать совещание</button>
                                {meetingLink && isLinkVisible &&  (
                                <div className={styles.link}>
                                    <p className={styles.text1}>Отправьте людям, с которыми хотите встретиться</p>
                                    <p className={styles.text2}>Обязательно сохраните его, чтобы вы могли исползовать его позже</p>
                                    <p className={styles.getLink} onClick={handleCopyLink}>{meetingLink}</p>
                                    <Link to='/meeting'><button className={styles.joinBtn}>Присоединиться</button></Link>
                                </div>
                                )}
                                
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

export default CreateMeeting;
