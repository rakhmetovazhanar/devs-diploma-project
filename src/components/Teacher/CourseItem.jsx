import React, {useState} from 'react';
import styles from '../../styles/CourseItem.module.css';
import axios from 'axios';


const randomPhotos = [
  'https://cdn.britannica.com/30/199930-131-B3D1D347/computer.jpg',
  'https://www.herzing.edu/sites/default/files/2020-09/it_computer_programming.jpg',
  'https://www.codingem.com/wp-content/uploads/2021/10/juanjo-jaramillo-mZnx9429i94-unsplash-1024x683.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwEMxeuQ2rw0IKhvzKiCV5NNyfm1ez6I5YZA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSg1JMsWDcY9eDh-QsoOrO-fOF8-T2Hi08dw&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2x7oJNjniXyjJLgKCs0vxOEWburf99-i2ww&usqp=CAU'
];

const CourseItem = ({course, handleDelete}) => {
  const randomPhotoIndex = Math.floor(Math.random() * randomPhotos.length);
  const randomPhotoUrl = randomPhotos[randomPhotoIndex];
  const [initialPrice] = useState(course.cost);
  
  return (
    <div className={styles.course_item}>
      <img src={randomPhotoUrl} alt="course" />

      <div className={styles.course_item_info}>
        <h3 className={styles.course_item_name}>{course.name}</h3>
        <div className={styles.course_item_desc_cost}>
          <p className={styles.course_item_desc}>{course.description}</p>
          <p className={styles.course_item_cost}>{initialPrice} тг</p>
        </div>
        <span className={styles.course_item_line}></span>
        <div className={styles.course_item_rating_functions}>
          <div className={styles.course_item_rating_count}>
            <p className={styles.course_item_rating}>0</p>
            <p className={styles.course_item_count}>0 студенты</p>
          </div>

          <div className={styles.course_item_functions}>
            <button className={styles.course_item_addTime}>Добавить время</button>
            <button className={styles.course_item_edit}>Редактировать</button>
            <button  onClick={()=>handleDelete(course.id)} className={styles.course_item_delete}>Удалить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseItem;
