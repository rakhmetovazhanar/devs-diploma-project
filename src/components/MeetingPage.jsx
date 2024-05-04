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
import { Box, Heading, Container } from '@chakra-ui/react';
import Notifications from './Notifications';
import Options from './Options';


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

                <div className={styles.meeting_content}>
                    <div className={styles.inner_meeting}>
                    <Box>
                        <Container maxW="1200px" mt="8">
                            <Heading as="h2" size="2xl"> Video Chat App </Heading>
                            <VideoPlayer />
                            <Options />
                            <Notifications />
                        </Container>
                        </Box>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MeetingPage;
