import React from 'react';
import styles from '../styles/Home.module.css';

const CourseItem = (props) => {
  return (
    <div className={styles.courseItem}>
        <img src={props.img} />
        <h3 className={styles.courseName}>{props.name}</h3>
        <p>{props.desc}</p>
    </div>
  )
}

export default CourseItem;
