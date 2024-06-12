import React, {useState, useEffect, useContext, useMemo} from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CommentItem from '../../ui/CommentItem';
import leftSide from '../../images/leftSide.svg';
import rightSide from '../../images/rightSide.svg';
import def from '../../images/defaultProfImg.jpg';

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
  const [ratingSet, setRatingSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseComments, setCourseComments] = useState(null);
  const [visibleComments, setVisibleComments] = useState(2);

  const showMoreComments = () => {
    setVisibleComments(visibleComments + 2); // Увеличиваем количество показываемых комментариев на 2
  };

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
        const response = await axios.get(`https://genuis.tech/api/course-details/${courseId}`);
        setCourseData(response.data);
        setLoading(false);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching course:', error);
        setLoading(false);
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
  
      await axios.post(`https://genuis.tech/api/rate-course/${courseId}`, {
        studentId: user.user_id,
        rating: value
      }, config);
  
      setTimeout(() => {
      }, 3000);
    } catch (error) {
      console.error('Error rating course:', error);
    }
  };

  
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://genuis.tech/api/comments/${courseId}`);
        setCourseComments(response.data);
        console.log('comments:', response.data)
      } catch (error) {
        console.error('Error fetching comment:', error);
        
      }
    };

    useEffect(() => {
      fetchComments();
  }, [courseId]); 

  const sortedComments = useMemo(() => {
    if (!courseComments) return [];
    return [...courseComments].reverse();
}, [courseComments]);

  const postComment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://genuis.tech/api/comment/${courseId}`, {
        comment: comment
      },{
        headers: {
          Authorization: `Token ${token}`
        }
      });

      fetchComments();
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
                  {loading ? ( // Если идет загрузка, отображаем анимацию загрузки
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                      <CircularProgress />
                    </Box>
                  ) : ( 
                  <div className={styles.main_content}>
                    <div className={styles.pages_links}>
                      <Link to='/'>Главная страница / </Link>
                      <Link to='/student-courses'> Мои курсы / </Link>
                      <p>{courseData && courseData.name}</p>
                    </div>
                    

                    <div className={styles.course_content}>
                    <img className={styles.leftSide} src={leftSide} alt="" />
                    <img className={styles.rightSide} src={rightSide} alt="" />
                      <div className={styles.course_content_inner}>
                        <img className={styles.course_img} src={randomPhotoUrl} alt="course" />

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
                            <img className={styles.teacher_img} src={courseData.profile_picture ? `https://genuis.tech${courseData.profile_picture}` : def} alt="prof" />
                            <div className={styles.created_name_sur}>
                              <p className={styles.created}>Созданный: </p>
                              <div className={styles.course_teacher_name_sur}>
                                <p className={styles.course_teacher_name}>{courseData && courseData.first_name}</p>
                                <p className={styles.course_teacher_surname}>{courseData && courseData.last_name}</p>
                              </div>
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
                           
                          </div>
                          <textarea 
                          placeholder='Добавляйте свои комментарии...'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}/>
                          {commentSaved && <p className={styles.commentSaved}>Комментарий успешно сохранен!</p>}
                          <button onClick={handleSaveComment}>Сохранить</button>
                        </div>

                        <div className={styles.comments}>
                          {sortedComments && sortedComments.length > 0 && (
                              <h3 className={styles.comments_title}>Другие комментарии</h3>
                          )}
                          {sortedComments && sortedComments.length > 0 ? (
                              sortedComments.slice(0, visibleComments).reverse().map((comment, index) => (
                                  <CommentItem key={index} comment={comment} />
                              ))
                          ) : (
                              <p className={styles.noComments}>Нет комментариев</p>
                          )}
                          {sortedComments && sortedComments.length > visibleComments && (
                              <button onClick={showMoreComments} className={styles.showMoreButton}>
                                Загружайте больше
                              </button>
                          )}
                
                        </div>  
                        </div>
                        
                      </div>
                    </div>
                    <Link to='/student-courses'><button className={styles.prevPage}>Назад</button></Link>
                    
                  </div>
                  )}
            </div>
            <Footer/>
        </div>
                  
        </div>
        
    </div>
  )
}

export default StudentCourseItem;
