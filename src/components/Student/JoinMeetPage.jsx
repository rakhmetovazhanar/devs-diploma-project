import React, {useEffect, useState} from 'react';
import axios from 'axios';
import StudentHeader from './StudentHeader';
import styles from '../../styles/JoinMeetPage.module.css';
import joinMeet from '../../images/joinMeet.svg';
import def from '../../images/defaultProfImg.jpg';
import Footer from '../../ui/Footer';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ProfilePicture from '../ProfilePicture';

const JoinMeetPage = () => {
    const [teacher , setTeacher] = useState(null);
    const {courseId} = useParams();
    // const [meetingLink, setMeetingLink] = useState('');
    const history = useNavigate();
    const [enteredLink, setEnteredLink] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
          try {
            const response = await axios.get(`http://134.209.250.123:8000/api/course-details/${courseId}`);
            setTeacher(response.data);
            console.log(response.data)
          } catch (error) {
            console.error('Error fetching course:', error);
          }
        };
    
        fetchCourse();
      }, [courseId]); 

      const handleLinkChange = (event) => {
        setEnteredLink(event.target.value);
    };

    const handleJoinMeeting = async () => {
      try {
          const token = localStorage.getItem('token');
          console.log(token);
          
          // Отправляем введенную ссылку на сервер в теле запроса
          const response = await axios.post(`http://134.209.250.123:8000/api/join-to-video-conference/${courseId}`, 
              { url: enteredLink }, // Поместите введенную ссылку в тело запроса
              {
                  headers: {
                      Authorization: `Token ${token}`,
                  },
              }
          );
          const meetingLink  = response.data; 
          console.log(meetingLink)
          
         
          if (response.status === 200 && response.data.message === "You are joined to videoconference!") {
            // Перенаправляем на страницу митинга
            history('/meeting');
        } else {
            console.error('Ошибка: Неверная ссылка для присоединения к митингу.');
        }
      } catch (error) {
          console.error('Ошибка при проверке ссылки:', error);
      }
  };
  

  return (
    <div className={styles.wrapper}>
        <div className={styles.wrap_inner}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <StudentHeader headerTitle={'Видеоконференция'}/>

                    <div className={styles.joinMeet_content}>
                        <div className={styles.inner_joinMeet}>
                        <img className={styles.joinMeet_photo} src={joinMeet} alt="join_meet" />
                        <h2 className={styles.joinMeet_title}>Присоединиться к совещанию</h2>
                        <p className={styles.joinMeet_subtitle}>Подключайтесь, сотрудничайте и отмечайте события из любой точки мира с помощью Видео Конференций.</p>
                        <div className={styles.teacher_joinBtn}>
                            <div className={styles.teacher_info}>
                                {/* <img src={teacher.profile_picture && teacher.profile_picture ? `http://134.209.250.123:8000${teacher.profile_picture}` : def} alt="prof" /> */}
                                <img className={styles.teacher_img} src={def} alt="" />
                                <p>{teacher && teacher.first_name} {teacher && teacher.last_name}</p>
                            </div>
                            <input 
                            className={styles.pasteLink} 
                            type="text" 
                            placeholder='Введите ссылку'
                            value={enteredLink}   
                            onChange={handleLinkChange}
                            />
                            <button 
                            onClick={handleJoinMeeting}
                            >Присоединиться</button>
                        </div>
                    </div>

                    <Link to='/student-courses'><button className={styles.prevPage}>Назад</button></Link>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default JoinMeetPage;
