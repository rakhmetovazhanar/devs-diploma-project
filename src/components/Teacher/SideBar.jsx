import React , {useContext }from 'react';
import { Link } from 'react-router-dom';
import TeacherSideBarData from './TeacherSideBarData';
import StudentSideBarData from '../Student/StudentSideBarData';
import SideBarItem from './SideBarItem';
import styles from '../../styles/TeacherHeader.module.css';
import Logo from '../../ui/Logo';
import { IoMdClose } from "react-icons/io";
import { UserContext } from '../../components/UserContext';




const SideBar = ({isOpen, closeSideBar}) => {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <Link to='/'><Logo style={styles.logo}/></Link>
          <IoMdClose className={styles.closeIcon} onClick={closeSideBar} />

        </div>
          <p>Главное меню</p>
      <ul>
        {user.role=== 'Репетитор' && (
          <>
          {TeacherSideBarData.map((item, index) => (
            <SideBarItem key={index} title={item.title} icon={item.icon} link={item.link} />
          ))}
          </>
        )}
        {user.role === 'Студент' && (
          <>
          {StudentSideBarData.map((item, index) => (
            <SideBarItem key={index} title={item.title} icon={item.icon} link={item.link} />
          ))}
          </>
        )}
        
      </ul>
    </div>
  );
};

export default SideBar;