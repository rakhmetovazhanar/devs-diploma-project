import React, {useContext, useState, useEffect, useRef} from 'react';
import { UserContext } from './UserContext';
import TeacherHeader from './Teacher/TeacherHeader';
import StudentHeader from './Student/StudentHeader';
import styles from '../styles/MeetingPage.module.css';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone";
import VideoPlayer from './VideoPlayer';


const MeetingPage = () => {
  const {user} = useContext(UserContext);

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

                {/* <VideoPlayer/> */}

                <div className={styles.meeting_content}>
                    <div className={styles.inner_meeting}>
                        {/* <div className={styles.video}>
                            {stream && <video playsInline muted ref={myVideo} autoPlay style={{width: '300px'}}/> }
                        </div>
                        <div className={styles.video}>
                            {callAccepted && !callEnded ? 
                            <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}}/> : null    
                        }
                        </div>
                    </div>

                    <div className="myId">
                        <TextField
                            id="filled-basic"
                            label="Name"
                            variant="filled"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginBottom: "20px" }}
                        />
                        <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                            <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                                Copy ID
                            </Button>
                        </CopyToClipboard>

                        <TextField
                            id="filled-basic"
                            label="ID to call"
                            variant="filled"
                            value={idToCall}
                            onChange={(e) => setIdToCall(e.target.value)}
                        />
                        <div className="call-button">
                            {callAccepted && !callEnded ? (
                                <Button variant="contained" color="secondary" onClick={leaveCall}>
                                    End Call
                                </Button>
                            ) : (
                                <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                    <PhoneIcon fontSize="large" />
                                </IconButton>
                            )}
                            {idToCall}
                        </div>
                    </div>
                    <div>
                        {receivingCall && !callAccepted ? (
                                <div className="caller">
                                <h1 >{name} is calling...</h1>
                                <Button variant="contained" color="primary" onClick={answerCall}>
                                    Answer
                                </Button>
                            </div>
                        ) : null} */}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MeetingPage;
