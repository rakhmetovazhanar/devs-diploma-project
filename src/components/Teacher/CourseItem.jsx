import React, {useState, useContext} from 'react';
import styles from '../../styles/CourseItem.module.css';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import TeacherCoursePage from './TeacherCoursePage';
import { UserContext } from '../UserContext';
import randomPhotos from '../../ui/randomPhotos';

const CourseItem = ({course, handleDelete, deleteCourse}) => {
  const {user} =useContext(UserContext);
  const randomPhotoIndex = Math.floor(Math.random() * randomPhotos.length);
  const randomPhotoUrl = randomPhotos[randomPhotoIndex];
  const [price, setPrice] = useState(course.cost);
  const history = useNavigate();
  

  const openCoursePageHandler = (event) => {
    if(user.role==='Репетитор'){
      if (event.target.classList.contains(styles.course_item_edit) || event.target.classList.contains(styles.course_item_delete)) {
        return; 
    }
    history(`/teacher-course-page/${course.id}`); 
    } else if(user.role==='Студент'){
      if (event.target.classList.contains(styles.course_item_edit) || event.target.classList.contains(styles.course_item_delete)) {
        return; 
    }
    history(`/student-course-page/${course.id}`); 
    }
    
}
  
 
  return (
    <div onClick={openCoursePageHandler} className={styles.course_item}>
      <img src={randomPhotoUrl} alt="course" />
      {/* <TeacherCoursePage course={course}/> */}

      <div className={styles.course_item_info}>
        <h3 className={styles.course_item_name}>{course.name}</h3>
        <div className={styles.course_item_desc_cost}>
          <p className={styles.course_item_desc}>{course.description}</p>
          <p className={styles.course_item_cost}>{price} тг</p>
        </div>
        <span className={styles.course_item_line}></span>
        <div className={styles.course_item_rating_functions}>
          <div className={styles.course_item_rating_count}>
            <p className={styles.course_item_rating}>{course.avg_rating}</p>
            {user.role==='Репетитор' && (
              <>
              <p className={styles.course_item_count}>0 студенты</p>
              </>
            )}
            <p className={styles.course_item_date_time}>{course.day_time}</p>
          </div>

          <div className={styles.course_item_functions}>
            {user.role === 'Репетитор' && (
              <>
              <Link to={`/teacher-edit-course/${course.id}`}><button className={styles.course_item_edit}>Редактировать</button></Link>
              <button  onClick={()=>handleDelete(course.id)}  className={styles.course_item_delete}>Удалить</button>

              </>
            )}
            {user.role ==='Студент' && (
              <>
              <Link to={'/'}><button className={styles.course_item_video}>Присоединение к уроку</button></Link>
              <button  onClick={()=>deleteCourse(course.id)}  className={styles.course_item_delete}>Удалить</button>

              </>
            )}
            {/* <button  onClick={()=>handleDelete(course.id)}  className={styles.course_item_delete}>Удалить</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseItem;
