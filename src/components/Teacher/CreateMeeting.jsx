  import React, {useEffect, useState, useRef, useContext} from 'react';
  import styles from '../../styles/CreateMeeting.module.css';
  import TeacherHeader from './TeacherHeader';
  import Footer from '../../ui/Footer';
  import axios from 'axios';
  import {Link} from 'react-router-dom';
  import { SocketContext } from '../SocketContext';
  import Peer from 'simple-peer';

  const CreateMeeting = () => {
      const [teacherCourses, setTeacherCourses] = useState([]);
      const [selectedCourse, setSelectedCourse] = useState("");
      const [isLinkVisible, setIsLinkVisible] = useState(false);
      const webSocketRef = useRef(null);
      const peerRef = useRef(null);
      const {setTeacherStream, setRoomName, roomName, setVideoStreamRequested} = useContext(SocketContext)
      const [wsOpen, setWsOpen] = useState(false); 

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
          // const webSocketRef = useRef(null);
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
            setIsLinkVisible(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setTeacherStream(stream);

            const peer = new Peer({ initiator: true, trickle: false, stream: stream });
            peerRef.current = peer;

            // webSocketRef.current.send(JSON.stringify({ type: 'offer', roomName: sessionId }));

            peer.on('signal', (data) => {
              console.log('Sending offer:', data);
              const offerData = {
                  type: 'offer',
                  roomName: sessionId,
                  sdp: data.sdp  // Отправляем только SDP
              };
              webSocketRef.current.send(JSON.stringify(offerData));
          });

            peer.on('stream', (stream) => {
              
            }); 
            
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
        };

        useEffect(() => {
          if (roomName) {
              const wsUrl = `ws://134.209.250.123:8080/ws/conference/${roomName}`;
              console.log(wsUrl)
              const ws = new WebSocket(wsUrl);
              console.log(ws)
              webSocketRef.current = ws;

              ws.onopen = () => {
                  console.log('WebSocket connection is open');
                  setWsOpen(true); 
                  ws.send(JSON.stringify({ type: 'create_room', roomName: roomName }));
              };

              ws.onmessage = (event) => {
                console.log('Received message:', event.data);
                const message = JSON.parse(event.data);
                if (message.type === 'answer') {
                    console.log('Received answer:', message.data);
                    peerRef.current.signal(message.data);
                }
            };
              ws.onclose = () => {
                  console.log('WebSocket connection is closed');
                  setWsOpen(false);
              };
              ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                setWsOpen(false);
            };

              // return () => {
              //     ws.close();
              //     webSocketRef.current = null;
              // };
          }
      }, [roomName]);

      
      const sendSignal = (data) => {
        if (wsOpen) { // Проверяем, что соединение установлено
            webSocketRef.current.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not open yet');
        }
    };


    const handleCopyLink = (event) => {
      event.stopPropagation(); // Предотвращаем всплытие события до родительских элементов
  
      if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(roomName)
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
