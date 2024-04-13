import React, {useState, useEffect, useContext} from 'react';
import Footer from '../ui/Footer';
import styles from '../styles/CourseItemPage.module.css';
import {useParams, Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import categories from './courseCategories';
import ModalToLogin from './ModalToLogin';
import { UserContext } from './UserContext';
import TeacherHeader from './Teacher/TeacherHeader';
import NotLoginHeader from './NotLoginHeader';
import randomPhotos from '../ui/randomPhotos';
import ModalSuccessEnrolled from './ModalSuccessEnrolled';


const CourseItemPage = () => {
    const {user} =useContext(UserContext);
    const { courseId } = useParams();
    const randomPhotoIndex = Math.floor(Math.random() * randomPhotos.length);
    const randomPhotoUrl = randomPhotos[randomPhotoIndex];
    const [courseData, setCourseData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem('token')
    const [isEnrolledModal, setIsEnrolledModal] = useState(false);
    const [isEnrolled, setIsEnrolled] =useState(false);
    const [courses, setCourses] = useState([]);
    const queryParams = new URLSearchParams(window.location.search);
    const showAdditionalLink = queryParams.get('showLink') === 'true';
    const location = useLocation();
    const { categoryName } = location.state ? location.state : {}; 

    useEffect(() => {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`http://134.209.250.123:8000/api/course-details/${courseId}`);
          setCourseData(response.data);
          
        } catch (error) {
          console.error('Error fetching course:', error);
        }
      };
      fetchCourse();
    }, [courseId]); 


    useEffect(() => {
      if(user.role ==='Студент'){
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://134.209.250.123:8000/api/student-courses/${user.user_id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const courses = response.data;
        const courseIds = courses.map(course => course.id);
        const courseIdNumber = parseInt(courseId);
        setIsEnrolled(courseIds.includes(courseIdNumber));
       
  
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      fetchData();
    }
    }, []);

  
  
    const getCategoryNameById = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown';
    };
    const handleEnrollClick = () => {
        if (user.loggedIn) {
          axios.post(`http://134.209.250.123:8000/api/enroll-to-course/${courseId}`,null, {
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

  return (
    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
                <NotLoginHeader showNavLinks={false}/>
                  {/* MAIN CONTENT */}
                  <div className={styles.main_content}>
                    <div className={styles.pages_links}>
                      <Link to='/'>Главная страница / </Link>
                      {showAdditionalLink && (
                        <>
                        <p>Выберите любимое курс из высшей категории/</p>
                        <p>{categoryName}/</p>
                        </>
                    )}
                      <p className={styles.last}>{courseData && courseData.name}</p>
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
                              <p className={styles.course_rating}>{courseData && courseData.average_rating}</p>
                              <p className={styles.course_date_time}>{courseData && courseData.day_time}</p>
                              <p className={styles.course_cost}>{courseData && courseData.cost} тг</p>
                            </div>
                          </div>
                          <span className={styles.line2}></span>
                          <div className={styles.course_functions}>
                          {isEnrolled ? (
                            <button className={styles.course_item_delete} onClick={()=>deleteCourse(courseData.id)}>Удалить</button>
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
                    <Link to='/'><button className={styles.prevPage}>Назад</button></Link>
                    
                  </div>
                
            </div>
            <Footer/>
        </div>
                  
        </div>

        {isModalOpen && <ModalToLogin onClose={() => setIsModalOpen(false)} />}
        {isEnrolledModal && <ModalSuccessEnrolled onClose={() => setIsEnrolledModal(false)}/>}

    </div>
  )
}

export default CourseItemPage;
