import React from 'react';
import { LOCAL_VIDEO } from '../hooks/useWebRTC';
import styles from '../styles/Participant.module.css';

const Participant = ({ clientID, provideMediaRef, toggleAudio, toggleVideo, isAudioEnabled, isVideoEnabled  }) => {
  return (
    <div className={styles.participant}>
      <video
        ref={instance => provideMediaRef(clientID, instance)}
        autoPlay
        playsInline
        muted={clientID === LOCAL_VIDEO}
      />
       <div className={styles.controls}>
              <button onClick={toggleAudio}>
                {isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
              </button>
              <button onClick={toggleVideo}>
                {isVideoEnabled ? 'Stop Video' : 'Start Video'}
              </button>
            </div>
    </div>
  );
};

export default Participant;
