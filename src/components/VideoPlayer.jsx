            
        import { Grid, Box, Heading } from "@chakra-ui/react"
        import { useContext } from "react"
        import { SocketContext } from "./SocketContext"
        import {useEffect} from 'react';
        import { UserContext } from "./UserContext";
        import styles from '../styles/MeetingPage.module.css';
        import {useState} from 'react';
        import videoOn from '../images/videoOn.svg';
        import videoOff from '../images/videoOff.svg';
        import audioOff from '../images/audioOff.svg';
        import audioOn from '../images/audionON.svg';


        const VideoPlayer = () => {
            const {user} = useContext(UserContext);
            const { 
                name,
                callAccepted,
                myVideo,
                userVideo,
                callEnded,
                call,
                teacherStream, 
                studentStream ,
            } = useContext(SocketContext)
            const [videoSet, setVideoSet] = useState(false);
            const [videoEnabled, setVideoEnabled] = useState(true);
            const [audioEnabled, setAudioEnabled] = useState(true);
            


            useEffect(() => {
                if (teacherStream && myVideo.current) {
                    myVideo.current.srcObject = teacherStream;
                }
                if (studentStream && userVideo.current) {
                    userVideo.current.srcObject = studentStream;
                }
            }, [teacherStream, studentStream, myVideo, userVideo]);

        useEffect(() => {
            if (callAccepted && !callEnded && userVideo.current && call.signal) {
                const peer = new RTCPeerConnection();
                peer.ontrack = (event) => {
                    userVideo.current.srcObject = event.streams[0];
                };
                peer.setRemoteDescription(new RTCSessionDescription(call.signal));
                peer.createAnswer().then((answer) => {
                    peer.setLocalDescription(new RTCSessionDescription(answer));
                });
            }
        }, [callAccepted, callEnded, userVideo, call]);

        const toggleVideo = () => {
            setVideoEnabled(!videoEnabled);
            if (teacherStream || studentStream) {
                const videoTrack = teacherStream ? teacherStream.getVideoTracks()[0] : studentStream.getVideoTracks()[0];
                if (videoTrack) {
                    videoTrack.enabled = videoEnabled;
                }
            }
        };
        
        const toggleAudio = () => {
            setAudioEnabled(!audioEnabled);
            if (teacherStream || studentStream) {
                const audioTrack = teacherStream ? teacherStream.getAudioTracks()[0] : studentStream.getAudioTracks()[0];
                if (audioTrack) {
                    audioTrack.enabled = audioEnabled;
                }
            }
        };

        return (
            <Grid className={styles.video_content}  justifyContent="center" templateColumns='repeat(2, 1fr)' mt="12">
{teacherStream && !callEnded && (
            <div>
                <div className={styles.teacher_video} colSpan={1}>
                    <video
                        className={styles.first_user}
                        playsInline
                        muted
                        ref={myVideo}
                        autoPlay
                        width="800"
                        style={{ transform: 'scaleX(-1)' }}
                    />
                    <div className={styles.videoToggle} onClick={toggleVideo}>
                        {videoEnabled ? 
                            <img src={videoOff} alt="" />
                            : 
                            <img src={videoOn} alt="" />
                        }
                    </div>
                    <div className={styles.audioToggle} onClick={toggleAudio}>
                        {audioEnabled ?
                             <img src={audioOff} alt="" />
                            : 
                            <img src={audioOn} alt="" />
                           
                        }
                    </div>
                </div>
                {/* <div colSpan={1}>
                    <video
                        className={styles.second_user}
                        playsInline
                        ref={userVideo}
                        autoPlay
                        width="500"
                        style={{ transform: 'scaleX(-1)' }}
                    />
                </div> */}
            </div>
        )}

        {studentStream && !callEnded && (
            <div>
                {/* <div className={styles.student_video} colSpan={1}>
                    <video
                        className={styles.first_user}
                        playsInline
                        muted
                        ref={myVideo}
                        autoPlay
                        width="500"
                        style={{ transform: 'scaleX(-1)' }}
                    />
                    <div className={styles.videoToggleStud} onClick={toggleVideo}>
                        {videoEnabled ? 
                            <img src={videoOff} alt="" />
                            : 
                            <img src={videoOn} alt="" />
                        }
                    </div>
                    <div className={styles.audioToggleStud} onClick={toggleAudio}>
                        {audioEnabled ?
                             <img src={audioOff} alt="" />
                            : 
                            <img src={audioOn} alt="" />
                           
                        }
                    </div>
                </div> */}
                <div className={styles.student_video} colSpan={1}>
                    <video
                        className={styles.second_user}
                        playsInline
                        ref={userVideo}
                        autoPlay
                        width="500"
                        style={{ transform: 'scaleX(-1)' }}
                    />
                    <div className={styles.videoToggle} onClick={toggleVideo}>
                        {videoEnabled ? 
                            <img src={videoOff} alt="" />
                            : 
                            <img src={videoOn} alt="" />
                        }
                    </div>
                    <div className={styles.audioToggle} onClick={toggleAudio}>
                        {audioEnabled ?
                             <img src={audioOff} alt="" />
                            : 
                            <img src={audioOn} alt="" />
                           
                        }
                    </div>
                </div>
            </div>
        )}
            </Grid>
        )
        }
            export default VideoPlayer
