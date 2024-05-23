import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import StudentHeader from './StudentHeader';
import styles from '../../styles/JoinMeetPage.module.css';
import joinMeet from '../../images/joinMeet.svg';
import def from '../../images/defaultProfImg.jpg';
import Footer from '../../ui/Footer';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ProfilePicture from '../ProfilePicture';
import Peer from 'simple-peer';
import { SocketContext } from '../SocketContext';


const JoinMeetPage = () => {
    const [teacher , setTeacher] = useState(null);
    const {courseId} = useParams();
    const history = useNavigate();
    const [enteredLink, setEnteredLink] = useState('');
    const {roomName, stream,  setStudentStream, userVideo} = useContext(SocketContext)
    const [peer, setPeer] = useState(null);

    useEffect(()=>{
        console.log("usereffect join")
        if (stream && userVideo.current) {
            userVideo.current.srcObject = stream;
        }
    }, [stream, userVideo])

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
          
          const response = await axios.post(`http://134.209.250.123:8000/api/join-to-video-conference/${courseId}`, 
              { url: enteredLink }, 
              {
                  headers: {
                      Authorization: `Token ${token}`,
                  },
              }
          );
          const meetingLink  = response.data; 
          console.log(meetingLink.url)

          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setStudentStream(stream);

          const ws = new WebSocket(`ws://134.209.250.123:8000/ws/conference/${meetingLink.url}`);

            ws.onopen = () => {
                console.log('WebSocket connection is open');
            };

            ws.onmessage = (event) => {
                console.log('Received message:', event.data); 
                const message = JSON.parse(event.data);
                console.log(message);
                if (message.type === 'offer') {
                    if (message.roomName === roomName) { // Проверяем, что полученный оффер относится к текущей комнате
                        if (!peer) { // Проверяем, что объект Peer еще не создан
                            const newPeer = new Peer({ initiator: false, trickle: false, stream: stream });
            
                            newPeer.on('signal', (data) => {
                                ws.send(JSON.stringify({ type: 'answer', data }));
                            });
            
                            newPeer.on('stream', (stream) => {
                                // Update the user's video stream
                                setStudentStream(stream);
                            });
            
                            // Respond to the offer by sending back an answer
                            newPeer.signal(message.data);
            
                            setPeer(newPeer);
                        }
                    } else {
                        console.log('Received offer for a different room. Ignoring.');
                    }
                } else if (message.type === 'answer' && peer) {
                    // Обработка ответа
                    console.log('Received answer:', message);
                    // Получаем SDP ответ от другой стороны и устанавливаем его
                    peer.signal(message.answer);
                } else if (message.type === 'chat.message') {
                    // Обработка сообщения чата
                    console.log('Received chat message:', message.message_sdp);
                    // Обрабатываем сообщение типа "chat.message"
                } 
            };  
            
            ws.onclose = () => {
                console.log('WebSocket connection is closed');
            };

            history('/meeting');

          
         
         
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

