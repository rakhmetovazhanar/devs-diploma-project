import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import TeacherHeader from './Teacher/TeacherHeader';
import StudentHeader from './Student/StudentHeader';
import styles from '../styles/MeetingPage.module.css';
import { useParams } from 'react-router-dom';
import useWebRTC, { LOCAL_VIDEO } from '../hooks/useWebRTC';

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
  const { clients, provideMediaRef } = useWebRTC(roomId);
  const videoLayout = layout(clients.length);


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

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              height: '700px',
              width: '800px',
              marginTop: '150px',
              backgroundColor: 'rgba(25, 31, 69, 1)',
              borderRadius: '20px'
            }}>
              {clients.map((clientID, index) => {
                return (
                  <div key={clientID} style={videoLayout[index]} id={clientID}>
                    <video
                      width='100%'
                      height='100%'
                      ref={instance => {
                        provideMediaRef(clientID, instance);
                      }}
                      autoPlay
                      playsInline
                      muted={clientID === LOCAL_VIDEO}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
