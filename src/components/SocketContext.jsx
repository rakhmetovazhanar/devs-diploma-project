import { createContext, useState, useRef, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { UserContext } from './UserContext';

const SocketContext = createContext();
const socket = io('http://genuis.tech');
const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [roomName, setRoomName] = useState('');
    const [videoStreamRequested, setVideoStreamRequested] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef();    
    const {user} = useContext(UserContext);
    const [teacherStream, setTeacherStream] = useState();
    const [studentStream, setStudentStream] = useState();
    
    useEffect(() => {
        if (window.location.pathname === '/meeting' && !videoStreamRequested) {
            console.log('meet')
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((currentStream) => {
                    if (user.role === 'Репетитор') {
                        setTeacherStream(currentStream); 
                        console.log('Teacher:', currentStream)
                    } else {
                        setStudentStream(currentStream); 
                    }
                    console.log(stream, "stream")
                    // setStream(currentStream)
                    myVideo.current.srcObject = currentStream;
                })
                .catch(error => console.error('Error accessing media devices:', error));
            setVideoStreamRequested(true);
        }
    
        socket.on('me', (id) => setMe(id));
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, [videoStreamRequested, myVideo]);
    
    // const answerCall = () => {
    //     setCallAccepted(true);
    //     const peer = new Peer({ initiator: false, trickle: false, stream });
    //     peer.on('signal', (data) => {
    //         socket.emit('answerCall', { signal: data, to: call.from });
    //     });
    //     peer.on('stream', (currentStream) => {
    //         userVideo.current.srcObject = currentStream;
    //     });
    //     peer.signal(call.signal);
    //     connectionRef.current = peer;
    // };
    
    // const callUser = (id) => {
    //     console.log(stream)
    //     const peer = new Peer({ initiator: true, trickle: false, stream });
    //     peer.on('signal', (data) => {
    //         socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    //     });
    //     peer.on('stream', (currentStream) => {
    //         userVideo.current.srcObject = currentStream;
    //     });
    //     connectionRef.current = peer;
    // };

    // const leaveCall = () => {
    //     setCallEnded(true);
    //     connectionRef.current.destroy();
    //     window.location.reload();
    // };
    
    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            setStream,
            name,
            setName,
            callEnded,
            roomName, // Добавлено состояние roomName
            setRoomName,
            me,
            teacherStream,
            studentStream,
            setTeacherStream,
            setStudentStream
            // callUser,
            // leaveCall,
            // answerCall,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};
export { ContextProvider, SocketContext };
