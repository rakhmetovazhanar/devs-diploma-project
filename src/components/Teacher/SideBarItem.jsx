import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../../styles/TeacherHeader.module.css';


const SideBarItem = ({ title, icon, link, hoverIcon }) => {
  return (
    <li>
      <Link to={link} className={styles.nav_item}>
        <img src={icon} alt="icon" className={styles.icon}/>
        <h4>{title}</h4>
      </Link>
    </li>
  );
};

export default SideBarItem;