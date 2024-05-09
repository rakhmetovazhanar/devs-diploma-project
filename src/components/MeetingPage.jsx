    import React, {useContext, useState, useEffect, useRef} from 'react';
    import { UserContext } from './UserContext';
    import TeacherHeader from './Teacher/TeacherHeader';
    import StudentHeader from './Student/StudentHeader';
    import styles from '../styles/MeetingPage.module.css';
    import VideoPlayer from './VideoPlayer';
    import { Box, Heading, Container } from '@chakra-ui/react';
    import Notifications from './Notifications';
    import Options from './Options';
    import { SocketContext } from './SocketContext';


    const MeetingPage = () => {
    const {user} = useContext(UserContext);
    const { setRoomName } = useContext(SocketContext);

    useEffect(() => {
        const roomId = localStorage.getItem('roomId');
        if (roomId) {
            setRoomName(roomId);
        }
    }, [setRoomName]);

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
                    <VideoPlayer/>   
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    }

    export default MeetingPage;
