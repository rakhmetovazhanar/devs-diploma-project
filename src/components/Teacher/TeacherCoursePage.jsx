import React, {useState, useEffect, useContext} from 'react';
import TeacherHeader from './TeacherHeader';
import styles from '../../styles/TeacherCoursePage.module.css';
import {Link} from 'react-router-dom';
import Footer from '../../ui/Footer';
import axios from 'axios';
import categories from '../courseCategories';
import { useParams , useNavigate } from 'react-router-dom';
import randomPhotos from '../../ui/randomPhotos';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const CoursePage = () => {
  const { courseId } = useParams();
  const randomPhotoIndex = Math.floor(Math.random() * randomPhotos.length);
  const randomPhotoUrl = randomPhotos[randomPhotoIndex];
  const [courseData, setCourseData] = useState(null);
  const history = useNavigate();
  const [loading, setLoading] = useState(true);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://genuis.tech/api/course-details/${courseId}`);
        setLoading(false);
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]); 

  // console.log(courseData.name, courseData.id)


  const handleDelete = async (courseId) => {
    try {
      if(courseData.id) {
      const token = localStorage.getItem('token');
      await axios.delete(`https://genuis.tech/api/delete-course/${courseData.id}`, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      history('/my-courses');
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
                <TeacherHeader headerTitle={'Мои курсы'}/>
                  {/* MAIN CONTENT */}
                  {loading ? ( // Если идет загрузка, отображаем анимацию загрузки
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                  </Box>
                  ) : ( 
                  <div className={styles.main_content}>
                    <div className={styles.pages_links}>
                      <Link to='/'>Главная страница / </Link>
                      <Link to='/my-courses'> Мои курсы / </Link>
                      <p>{courseData && courseData.name}</p>
                    </div>

                    <div className={styles.course_content}>
                      <div className={styles.course_content_inner}>
                        <img src={randomPhotoUrl} alt="course" />

                        <div className={styles.course_info}>
                          <h2 className={styles.course_name}>{courseData && courseData.name}</h2>
                          <p className={styles.course_desc}>{courseData && courseData.description}</p>
                          <div className={styles.course_info_details1}>
                            <p>Категория курса :  {courseData && getCategoryNameById(courseData.category_id_id)}</p>
                            <p>Уровень :  {courseData && courseData.level}</p>
                            <p>Языки преподавания :  {courseData && courseData.language}</p>
                          </div>
                          <span className={styles.line}></span>
                          <div className={styles.course_info_details2}>
                            <div className={styles.course_teacher}>
                              <p className={styles.created}>Созданный: </p>
                              <div className={styles.course_teacher_name_sur}>
                                <p className={styles.course_teacher_name}>{courseData && courseData.first_name}</p>
                                <p className={styles.course_teacher_surname}>{courseData && courseData.last_name}</p>
                              </div>
                            </div>
                            <div className={styles.course_rating_cost}>
                              <p className={styles.course_rating}>0</p>
                              <p className={styles.course_date_time}>{courseData && courseData.day_time}</p>
                              <p className={styles.course_cost}>{courseData && courseData.cost} тг</p>
                            </div>
                          </div>
                          <span className={styles.line2}></span>
                          <div className={styles.course_functions}>
                            <Link to={`/teacher-edit-course/${courseId}`}><button className={styles.course_edit}>Редактировать</button></Link>
                            <button onClick={()=>handleDelete(courseData.id)} className={styles.course_delete}>Удалить</button>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <Link to='/my-courses'><button className={styles.prevPage}>Назад</button></Link>
                    
                  </div>
                  )}
                
            </div>
            <Footer/>
        </div>
                  
        </div>
        
    </div>
  )
}

export default CoursePage;
