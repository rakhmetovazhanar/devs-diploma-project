import React, {useState, useEffect, useContext} from 'react';
import styles from '../../styles/StudentCourseItem.module.css';
import StudentHeader from './StudentHeader';
import {Link} from 'react-router-dom';
import Footer from '../../ui/Footer';
import axios from 'axios';
import categories from '../courseCategories';
import { useParams , useNavigate } from 'react-router-dom';
import randomPhotos from '../../ui/randomPhotos';
import { MdOutlineStar } from "react-icons/md";
import { UserContext } from '../UserContext';

const colors = {
  orange: "#FD8E1F",
  grey: "#a9a9a9"
}

const StudentCourseItem = () => {
  const {user} = useContext(UserContext);
  const { courseId } = useParams();
  const [randomPhotoIndex, setRandomPhotoIndex] = useState(0);
  const [courseData, setCourseData] = useState(null);
  const history = useNavigate();
  const stars = Array(5).fill(0);
  const [currentValueStar,setCurrentValueStar] = useState(0);
  const [hoverValueStar ,setHoverValueStar] = useState(undefined);
  const [comment, setComment] = useState('');
  const [commentSaved, setCommentSaved] = useState(false);
  const [ratingSaved, setRatingSaved]= useState(false);
  const [ratingSet, setRatingSet] = useState(false);


  useEffect(() => {
    const index = Math.floor(Math.random() * randomPhotos.length);
    setRandomPhotoIndex(index);
  }, []);
  const randomPhotoUrl = randomPhotos[randomPhotoIndex];

  const handleClickStar = value=>{
    if (!ratingSet) {
    setCurrentValueStar(value);
    localStorage.setItem(`courseRating_${courseId}_${user.user_id}`, value.toString());
    setRatingSet(true);
    rateCourse(value);
    }
  }

  useEffect(() => {
    const savedRating = localStorage.getItem(`courseRating_${courseId}_${user.user_id}`);
    if (savedRating !== null) {
      setCurrentValueStar(parseInt(savedRating));
      console.log(parseInt(savedRating))
      setRatingSet(true)
    }
  }, [courseId]);

  const handleMouseOver = value =>{
    setHoverValueStar(value);
  }

  const handleMouseLeave = ()=>{
    setHoverValueStar(undefined);
  }

  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };
  
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

  const rateCourse = async (value) => {
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
  
      await axios.post(`http://134.209.250.123:8000/api/rate-course/${courseId}`, {
        studentId: user.user_id,
        rating: value
      }, config);
  
      console.log('Рейтинг успешно сохранен!');
      setRatingSaved(true);
      setTimeout(() => {
        setRatingSaved(false);
      }, 3000);
    } catch (error) {
      console.error('Error rating course:', error);
    }
  };

  const postComment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://134.209.250.123:8000/api/comment/${courseId}`, {
        comment: comment
      },{
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setCommentSaved(true);
      setTimeout(() => {
        setCommentSaved(false);
      }, 4000);
      console.log('Комментарий успешно сохранен!');
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleSaveComment = () => {
    postComment();
  };

  

  return (
    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
                <StudentHeader headerTitle={'Мои курсы'}/>
                  {/* MAIN CONTENT */}
                  <div className={styles.main_content}>
                    <div className={styles.pages_links}>
                      <Link to='/'>Главная страница / </Link>
                      <Link to='/student-courses'> Мои курсы / </Link>
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
                              <p className={styles.course_rating}>{courseData && courseData.average_rating}</p>
                              <p className={styles.course_date_time}>{courseData && courseData.day_time}</p>
                              <p className={styles.course_cost}>{courseData && courseData.cost} тг</p>
                            </div>
                          </div>
                          <span className={styles.line}></span>
                          <div className={styles.course_functions}>
                          <div className={styles.rating_stars}>
                            <h3>Оставьте свой комментарий</h3>
                            <div className={styles.stars}>
                              {stars.map((_, index)=>{
                                return(
                                  <MdOutlineStar 
                                  key={index}
                                  size={38}
                                  color ={(hoverValueStar || currentValueStar) > index ? colors.orange : colors.grey}
                                  onClick={() => handleClickStar(index+1)}
                                  onMouseOver={()=>handleMouseOver(index+1)}
                                  onMouseLeave={handleMouseLeave} />
                                )
                              })}
                            </div>
                            {ratingSaved && <p className={styles.ratingSaved}>Спасибо за оценку!</p>}
                          </div>
                          <textarea 
                          placeholder='Добавляйте свои комментарии...'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}/>
                          {commentSaved && <p className={styles.commentSaved}>Комментарий успешно сохранен!</p>}
                          <button onClick={handleSaveComment}>Сохранить</button>
                        </div>
                        </div>
                        
                      </div>
                    </div>
                    <Link to='/student-courses'><button className={styles.prevPage}>Назад</button></Link>
                    
                  </div>
                
            </div>
            <Footer/>
        </div>
                  
        </div>
        
    </div>
  )
}

export default StudentCourseItem;
