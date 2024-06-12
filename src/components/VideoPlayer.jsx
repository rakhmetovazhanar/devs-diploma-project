import { useContext } from 'react';
import { SocketContext } from './SocketContext';
import { useEffect } from 'react';
import { UserContext } from './UserContext';
import { useState } from 'react';

const VideoPlayer = () => {
  const { user } = useContext(UserContext);
  // const {
  //   name,
  //   callAccepted,
  //   myVideo,
  //   userVideo,
  //   callEnded,
  //   call,
  //   teacherStream,
  //   studentStream
  // } = useContext(SocketContext);
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
    <></>
  );
};

export default VideoPlayer;
