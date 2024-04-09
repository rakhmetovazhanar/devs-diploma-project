import React, {useContext, useState, useEffect} from 'react';
import styles from '../styles/FilteredCourseItems.module.css';
import ModalToLogin from './ModalToLogin';
import axios from 'axios';
import randomPhotos from '../ui/randomPhotos';
import ModalSuccessEnrolled from './ModalSuccessEnrolled';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';



const CourseByCategory = ({course, categoryName}) => {
    const {user} = useContext(UserContext);
    const randomPhotoIndex = Math.floor(Math.random() * randomPhotos.length);
    const randomPhotoUrl = randomPhotos[randomPhotoIndex];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEnrolledModal, setIsEnrolledModal] = useState(false);
    const [isEnrolled, setIsEnrolled] =useState(false);
    const history=useNavigate();
    const token = localStorage.getItem('token')
    const [courses, setCourses] =useState([]);
  
    
  
  
    useEffect(() => {
      if (user.role === 'Студент') {
      const fetchCourses = async () => {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://134.209.250.123:8000/api/student-courses/${user && user.user_id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          setCourses(response.data)
          const courses = response.data;
          const courseIds = courses.map(course => course.id);
          setIsEnrolled(courseIds.includes(course.id));
            
        }
  
        fetchCourses();
      }
    }, []);
  
    const deleteCourse = async (courseId) => {
      try {
        if(courseId) {
        const token = localStorage.getItem('token');
        await axios.delete(`http://134.209.250.123:8000/api/course-delete/${courseId}`, {
          headers: {
            Authorization: `Token ${token}`,
          }
        });
        setCourses(courses.filter(course => course.id !== courseId));
        setIsEnrolled(false)
      }
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    };
  
  
  
    const openCoursePageHandler = (event) => {
      if (event.target.classList.contains(styles.course_item_enroll) || event.target.classList.contains(styles.course_item_delete) ) {
          return; 
      }
      history(`/course-item/${course.id}?showLink=true`, {state: {categoryName}});
  }
  
  const handleEnrollClick = () => {
    if (user.loggedIn) {
      axios.post(`http://134.209.250.123:8000/api/enroll-to-course/${course.id}`,null, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('Студент успешно записан на курс');
          setIsEnrolledModal(true); 
          setIsEnrolled(true)
        })
        .catch(error => {
          console.error('Произошла ошибка при записи студента на курс:', error);
        });
    } else {
      setIsModalOpen(true);
    }
  };
  return (
    <div className={styles.wrap}>
        <div onClick={(event) => openCoursePageHandler(event)} className={styles.course_item}>
        <img src={randomPhotoUrl} alt="course" />

        <div className={styles.course_item_info}>
            <h3 className={styles.course_item_name}>{course.name}</h3>
            <div className={styles.course_item_desc_cost}>
            <p className={styles.course_item_desc}>{course.description}</p>
            <p className={styles.course_item_cost}>{course.cost} тг</p>
            </div>
            <span className={styles.course_item_line}></span>
            <div className={styles.course_item_rating_functions}>
            <div className={styles.course_item_rating_count}>
                <p className={styles.course_item_rating}>0</p>
                <p className={styles.course_item_date_time}>{course.day_time}</p>
            </div>

            <div className={styles.course_item_functions}>
            {isEnrolled ? (
                <button className={styles.course_item_delete} onClick={()=>deleteCourse(course.id)}>Удалить</button>
            ) : (
                <>
                {user.role !== 'Репетитор' &&(
                <>
                {user.loggedIn ? (
                    <button className={styles.course_item_enroll} onClick={handleEnrollClick}>
                    Записаться на курс
                    </button>
                ) : (
                    <button className={styles.course_item_enroll} onClick={() => setIsModalOpen(true)}>
                    Записаться на курс
                    </button>
                )}
                </>
                )} 
                </>
            )}
            
                </div>
            </div>
        </div>
        </div>
        {isModalOpen && <ModalToLogin onClose={() => setIsModalOpen(false)} />}
        {isEnrolledModal && <ModalSuccessEnrolled onClose={() => setIsEnrolledModal(false)}/>}
    </div>

  )
}

export default CourseByCategory;
