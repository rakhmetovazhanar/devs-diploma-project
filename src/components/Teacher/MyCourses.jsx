import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/MyCourses.module.css';
import {Link} from 'react-router-dom';
import { UserContext } from '../../components/UserContext';
import line2 from '../../images/line2.svg';
import Footer from '../../ui/Footer';
import CourseItem from './CourseItem';
import axios from 'axios';
import TeacherHeader from './TeacherHeader';

const MyCourses = () => {
    const {user} = useContext(UserContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://134.209.250.123:8000/api/get-teacher-courses/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const sortedCourses = response.data.slice().reverse();
        setCourses(sortedCourses);
        console.log(response.data) 
        console.log(response.data.id)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); 

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (courseId) => {
    try {
      if(courseId) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://134.209.250.123:8000/api/delete-course/${courseId}`, {
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

  // Передаем i

  return (
    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
                <TeacherHeader headerTitle={'Мои курсы'}/>
                  {/* MAIN CONTENT */}
                <div className={styles.main_content}>
                  <div className={styles.my_courses_actions}>
                    <Link to='/add-course'><button className={styles.to_add_course_btn}>Добавить курс</button></Link>
                  </div>
                </div>

                {/* COURSE LIST */}

                <div className={styles.my_courses_list}>
                {courses.length === 0 ? (
                  <h3 className={styles.no_courses}>У вас пока нет курсов</h3>
                ) : (
                  courses.filter(course => course.name.toLowerCase().includes(searchText.toLowerCase())).map((course) => (
                    <CourseItem key={course.id} course={course} handleDelete={handleDelete} />
                  ))
                )}
                </div>
            </div>
            <Footer/>
        </div>
                  
        </div>
        
    </div>
  )
}

export default MyCourses;
