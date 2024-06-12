import React, { useState } from 'react';
import styles from '../../styles/CreateMeeting.module.css';
import TeacherHeader from './TeacherHeader';
import Footer from '../../ui/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFIndAllCourses } from './hooks/useFIndAllCourses';

const CreateMeeting = () => {
  const courses = useFIndAllCourses();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const [roomId, setRoomId] = useState('');

  const handleClickOutside = () => {
    setIsLinkVisible(false);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleCreateMeeting = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`https://134.209.250.123:8000/api/create-video-conference/${selectedCourse}`, {
        courseId: selectedCourse
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      const sessionId = response.data.conference;

      setRoomId(sessionId);
      setIsLinkVisible(true);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const handleCopyLink = (event) => {
    event.stopPropagation();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(roomId)
        .then(() => {
          console.log('Ссылка скопирована успешно');
        })
        .catch((error) => {
          console.error('Ошибка при копировании ссылки:', error);
        });
    } else {
      console.error('API navigator.clipboard недоступно');
    }
  };

  return (
    <div className={styles.wrapper} onClick={handleClickOutside}>
      <div className={styles.wrap_inner}>
        <div className={styles.header}>
          <div className={styles.container}>
            <TeacherHeader headerTitle={'Видеоконференция'}/>

            <div className={styles.meeting}>
              <div className={styles.inner_meeting}>
                <h2 className={styles.meeting_title}>
                  Безопасная Видеоконференция для всех
                </h2>
                <p className={styles.meeting_subtitle}>Получите ссылку на специальные занятия</p>
                <div className={styles.chooseCourse}>
                  <label>
                    Название вашего курса
                  </label>
                  <select className={styles.courseDropdown} onChange={handleCourseChange}>
                    <option value=''>Выбирать</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.btn}>
                  <button className={styles.createBtn} onClick={handleCreateMeeting}>
                    Создать совещание
                  </button>
                  {roomId && isLinkVisible && (
                    <div className={styles.link}>
                      <p className={styles.text1}>Отправьте людям, с которыми хотите встретиться</p>
                      <p className={styles.text2}>Обязательно сохраните его, чтобы вы могли исползовать его позже</p>
                      <p className={styles.getLink} onClick={handleCopyLink}>{roomId}</p>
                      <Link to={`/meeting/${roomId}`}>
                        <button className={styles.joinBtn}>Присоединиться</button>
                      </Link>
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
  );
};

export default CreateMeeting;
