import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import styles from '../styles/TeacherHeader.module.css';
import profileImage from '../images/profileImg.svg';
import def from '../images/defaultProfImg.jpg';

const ProfilePicture = () => {
  const { user } = useContext(UserContext);

  return (
    <img className={styles.profilePic}
    src={user.profile_picture ? `https://genuis.tech${user.profile_picture}` : def}
    alt="prof" />
  );
};

export default ProfilePicture;
