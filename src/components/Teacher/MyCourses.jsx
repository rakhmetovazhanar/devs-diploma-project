import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/MyCourses.module.css';
import burgerImg from '../../images/burgerImg.svg';
import {Link} from 'react-router-dom';
import { UserContext } from '../../components/UserContext';
import line2 from '../../images/line2.svg';
import Footer from '../../ui/Footer';
import CourseItem from './CourseItem';
import axios from 'axios';

const MyCourses = () => {
    const [isActiveDropdown, setIsActiveDropdown] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const {user} = useContext(UserContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleDropdownClick = () => {
      setIsActiveDropdown(!isActiveDropdown);
      setIsRotated(!isRotated);
    };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://134.209.250.123:8000/api/get-teacher-courses/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setCourses(response.data);
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

  return (
    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header_inner}>
                    <div className={styles.burgerSide}>
                        <img src={burgerImg} alt="burger" />
                        <h2>Мои курсы</h2>
                    </div>

                  <div onClick={handleDropdownClick} className={styles.users_profile}>
                <div className={styles.users_profile_info}>
                  <div className={styles.users_name_role}>
                    <div className={styles.users_name_surname}>
                      <div className={styles.users_name}>{user.first_name}</div>
                      <div>{user.last_name}</div>
                    </div>
                    <div className={styles.users_role}>{user.role}</div>
                  </div> 
                
                <img style={{ transform: isRotated ? 'rotate(180deg)' : 'none' }} src={line2}/>
                </div>

                {isActiveDropdown && 
                <ul>
                  <li>
                    <Link to='/profile'>Мой профиль</Link>
                  </li>
                  <li>
                    <Link to='/edit-profile'>Редактировать </Link>
                  </li>
                  <li>
                    <Link to='/logout'>Выйти</Link>
                  </li>
                </ul>}
              </div>
                </div>
                  {/* MAIN CONTENT */}
                <div className={styles.main_content}>
                  <div className={styles.my_courses_actions}>
                    <div className={styles.my_courses_filter}>
                      <input placeholder='Ищите в своих курсах...' className={styles.my_courses_searchBtn} type="search" />
                      <select className={styles.my_courses_categories}>
                        <option value="Вся категория">Вся категория</option>
                      </select>
                    </div>

                    <Link to='/add-course'><button className={styles.to_add_course_btn}>Добавить курс</button></Link>
                  </div>
                </div>

                {/* COURSE LIST */}

                <div className={styles.my_courses_list}>
                  {/* <h3 className={styles.no_courses}>У вас пока нет курсов</h3> */}
                  {courses.map((course)=> (
                  <CourseItem key={course.id} course={course} handleDelete={handleDelete} />  
                  ))}
                </div>
            </div>
            {/* <Footer/> */}
        </div>
                  
        </div>
        
    </div>
  )
}

export default MyCourses;
