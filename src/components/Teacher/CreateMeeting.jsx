import React, {useEffect, useState, useRef} from 'react';
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
    const webSocketRef = useRef(null);
    const [roomName, setRoomName] = useState("");

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

      useEffect(() => {
        if (roomName && !webSocketRef.current) {
            const wsUrl = `ws://134.209.250.123/ws/conference/${roomName}/`;
            const ws = new WebSocket(wsUrl);
            webSocketRef.current = ws;

            ws.onopen = () => {
                console.log('WebSocket connection is open');
                ws.send(JSON.stringify({ type: 'create_room', roomName: roomName }));
            };

            ws.onmessage = (event) => {
                console.log('Received message:', event.data);
            };

            ws.onclose = () => {
                console.log('WebSocket connection is closed');
            };

            return () => {
                ws.close();
                webSocketRef.current = null;
            };
        }
    }, [roomName]);


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
            courseId: selectedCourse 
          }, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          const sessionId = response.data.conference; 
            setRoomName(sessionId);
            setIsLinkVisible(true)
          
        } catch (error) {
          console.error('Error creating meeting:', error);
        }
      };

      const handleCopyLink = (event) => {
        event.stopPropagation(); // Предотвращаем всплытие события до родительских элементов
        navigator.clipboard.writeText(roomName);
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
                                {roomName && isLinkVisible &&  (
                                <div className={styles.link}>
                                    <p className={styles.text1}>Отправьте людям, с которыми хотите встретиться</p>
                                    <p className={styles.text2}>Обязательно сохраните его, чтобы вы могли исползовать его позже</p>
                                    <p className={styles.getLink} onClick={handleCopyLink}>{roomName}</p>
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
