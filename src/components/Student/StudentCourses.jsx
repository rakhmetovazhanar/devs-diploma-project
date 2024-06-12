import React , {useState, useEffect, useContext} from 'react';
import styles from '../../styles/StudentCourses.module.css';
import Footer from '../../ui/Footer';
import StudentHeader from './StudentHeader';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../UserContext';
import CourseItem from '../Teacher/CourseItem';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const StudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const {user} = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://134.209.250.123:8000/api/student-courses/${user.user_id}`, {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
    
            const sortedCourses = response.data.slice().reverse();
            setCourses(sortedCourses)
            console.log(sortedCourses)
            const courseIds = sortedCourses.map(course => course.id);
            setLoading(false);            
          } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
          }
        };
    
        fetchCourses();
      }, []); 


      const deleteCourse = async (courseId) => {
        try {
          if(courseId) {
          const token = localStorage.getItem('token');
          await axios.delete(`https://134.209.250.123:8000/api/course-delete/${courseId}`, {
            headers: {
              Authorization: `Token ${token}`,
            }
          });
          setCourses(courses.filter(course => course.id !== courseId));
        }
        } catch (error) {
          console.error('Error deleting course:', error);
        }
      };
    return (
    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
                <StudentHeader headerTitle={'Мои курсы'}/>
                  {/* MAIN CONTENT */}
                <div className={styles.main_content}>
                  {/* <div className={styles.my_courses_actions}>
                    <Link to='/add-course'><button className={styles.to_add_course_btn}>Добавить курс</button></Link>
                  </div> */}
                </div>
                {/* COURSE LIST */}
                {loading ? ( // Если идет загрузка, отображаем анимацию загрузки
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                  </Box>
                ) : ( 
                <div className={styles.my_courses_list}>
                {courses.length === 0 ? (
                  <h3 className={styles.no_courses}>У вас пока нет курсов</h3>
                ) : (
                  courses.map(course =>  (
                    <CourseItem key={course.id} course={course} 
                    deleteCourse={deleteCourse}
                    />
                  ))
                )}
                </div>
                )}
            </div>
            <Footer/>
        </div>
                  
        </div>
        
    </div>
  )
}

export default StudentCourses;
