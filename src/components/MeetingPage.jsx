import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import TeacherHeader from './Teacher/TeacherHeader';
import StudentHeader from './Student/StudentHeader';
import styles from '../styles/MeetingPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import useWebRTC, { LOCAL_VIDEO } from '../hooks/useWebRTC';
import {Link} from 'react-router-dom';
import Participant from './Participant';
import { RxExit } from "react-icons/rx";
import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { CiVideoOn } from "react-icons/ci";
import { CiVideoOff } from "react-icons/ci";

function layout(clientsNumber = 1) {

  const pairs = Array.from({ length: clientsNumber })
    .reduce((acc, next, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }

      return acc;
    }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs.map((row, index, arr) => {

    if (index === arr.length - 1 && row.length === 1) {
      return [{
        width: '100%',
        height
      }];
    }

    return row.map(() => ({
      width: '50%',
      height
    }));
  }).flat();
}


const MeetingPage = () => {
  const { user } = useContext(UserContext);
  const { roomId } = useParams();
  const { clients, provideMediaRef, toggleAudio, toggleVideo, mediaStates, leaveMeeting } = useWebRTC(roomId);
  const videoLayout = layout(clients.length);
  const history = useNavigate();

  const handleLeaveMeeting = () => {
    leaveMeeting();
    history.push('/my-courses'); // Redirect to home page or any other page
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap_inner}>
        <div className={styles.header}>
          <div className={styles.container}>
            {user.role === 'Репетитор' ? (
              <TeacherHeader headerTitle={'Видеоконференция'}/>
            ) : (
              <StudentHeader headerTitle={'Видеоконференция'}/>
            )}

            <div className={styles.pages_links}>
              <Link to='/'>Главная страница / </Link>
              <Link to='/my-courses'> Мои курсы </Link>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
              marginTop: '56px',
              backgroundColor: 'rgba(25, 31, 69, 1)',
              borderRadius: '20px',
              padding: '25px'
            }}>
              {clients.map((clientID, index) => {
                return (
                  <div key={clientID} style={videoLayout[index]} id={clientID}>
                  <video
                    width='100%'
                    height='100%'
                    ref={instance => provideMediaRef(clientID, instance)}
                    autoPlay
                    playsInline
                    muted={clientID === LOCAL_VIDEO}
                  />
                </div>
                  
                );
              })}
              <div className={styles.controls}>
              <button onClick={toggleAudio}>
                {isAudioEnabled ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
              </button>
              <button onClick={toggleVideo}>
                {isVideoEnabled ? <CiVideoOn /> : <CiVideoOff />}
              </button>
              <button className={styles.closeMeet} onClick={handleLeaveMeeting}><RxExit /></button> 
            </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
