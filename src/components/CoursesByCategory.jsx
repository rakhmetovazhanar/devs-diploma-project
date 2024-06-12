import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from './UserContext';
import NotLoginHeader from './NotLoginHeader';
import styles from '../styles/FilteredCourseItems.module.css';
import {Link, useParams } from 'react-router-dom';
import CourseByCategory from './CourseByCategory';
import Footer from '../ui/Footer';


const CoursesByCategory = () => {
  const {user} = useContext(UserContext);
  const { categoryId , categoryName} = useParams();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchCoursesByCategory = async () => {
      try {
        const response = await fetch(`https://genuis.tech/api/courses-by-category/${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoursesByCategory();
  }, [categoryId]); 


  return (

    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
            <NotLoginHeader/>
            <div className={styles.courses}>
            <div className={styles.pages_links}>
              <Link to='/'>Главная страница / </Link>
              <p>Выберите любимое курс из высшей категории/</p>
              <p className={styles.category_name}>{categoryName}</p>
            </div>
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseByCategory key={course.id} course={course} categoryName={categoryName}/>
              ))
            ) : (
              <p className={styles.no_courses}>Нет курсов в данной категории</p>
            )}
           </div>
            
            </div>
            <Footer/>
        </div>        
      </div>  
    </div>
  )
}

export default CoursesByCategory;
