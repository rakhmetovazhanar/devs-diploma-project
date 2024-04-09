import React from 'react'
import {useState, useContext, useEffect} from 'react';
import styles from '../styles/Home.module.css';
import Logo from '../ui/Logo';
import { Link as RouterLink } from 'react-router-dom';
import up from '../images/Up.svg';
import homeImg from '../images/homeImg.svg';
import studentsImg from '../images/studentsImg.svg';
import tutorsImg from '../images/tutorsImg.svg';
import subjectsImg from '../images/subjectsImg.svg';
import feedbacksImg from '../images/feedbacksImg.svg';
import CategoryItem from '../ui/CourseItem';
import HomeTeacherSlider from '../ui/HomeTeacherSlider';
import HomeGuideItem from '../ui/HomeGuideItem';
import circle1 from '../images/circle1.svg';
import circle2 from '../images/circle2.svg';
import circle3 from '../images/circle3.svg';
import circle4 from '../images/circle4.svg';
import HomeFeedbacksSlider from '../ui/HomeFeedbacksSlider';
import Footer from '../ui/Footer';
import { UserContext } from './UserContext';
import line2 from '../images/line2.svg';
import { Link as ScrollLink } from 'react-scroll'; 
import SearchFilters from '../ui/SearchFilters';
import FilteredCourseItems from './FilteredCourseItems';
import ModalToLogin from './ModalToLogin';
import NotLoginHeader from './NotLoginHeader';
import CourseCategories from '../components/CourseCategories.jsx';

const Home = () => {
  const {user} = useContext(UserContext);
  const [results , setResults] = useState([]);
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const handleDropdownClick = () => {
    setIsActiveDropdown(!isActiveDropdown);
    setIsRotated(!isRotated);
  };

  const handleSearchResults = (searchResults) => {
    setResults(searchResults);
    setIsSearchClicked(true); 
  };

  // useEffect(() => {
  //   console.log(results);
  // }, [results]);

 
  return (
    <div className={styles.wrapper}>
      
      <div className={styles.wrap_inner}>
      {/* <ModalToLogin className={styles.modal_window}/> */}
        <div className={styles.header}>
          <div className={styles.container}>
            <NotLoginHeader showNavLinks={true}/>
          </div>

          {/* SEARCH COURSER PART */}

          <section  className={styles.filterCourses}>
            <div className={styles.container}>
              <div className={styles.filterCourses_inner}>
                <h2>Ищешь помощь с учёбой?</h2>
                <h2>Выбирай лучших репетиторов с GENIUS!</h2>
                <SearchFilters onSearchResults={handleSearchResults}/>
              </div>
            </div>
          </section>

          {isSearchClicked && results && results.length > 0 ?(
            <div className={styles.filteredCourses}>
              <div className={styles.container}>
              {results.map((course, index) => (
                <FilteredCourseItems key={index} course={course}/>
              ))}
              </div>
            </div>
          ) : (
            <div>
            

          <div className={styles.container}>
          {/* ABOUT US */}
            
          <section id='aboutus' className={styles['about-us']}>
            <h2 className={styles['about-us-title']}>О нас</h2>
            <p className={styles['about-us-subtitle']}>Genius – это онлайн-школа с сертифицированными преподавателями и занятия проходят онлайн 1 на 1 <br/> с преподавателем на интерактивной платформе.</p>

            <div className={styles['about-us-info']}>
              <div className={styles['about-us-info-item']}>
                <img src={studentsImg} alt="students" />
                <div className={styles['about-us-info-item-text']}>
                  <h3>15K+</h3>
                  <p>Студенты</p>
                </div>
              </div>

              <div className={styles['about-us-info-item']}>
                <img src={tutorsImg} alt="tutors" />
                <div className={styles['about-us-info-item-text']}>
                  <h3>10K+</h3>
                  <p>Репетитор</p>
                </div>
              </div>
              
              <div className={styles['about-us-info-item']}>
                <img src={subjectsImg} alt="subjects" />
                <div className={styles['about-us-info-item-text']}>
                  <h3>100+</h3>
                  <p>Предметы</p>
                </div>
              </div>

              <div className={styles['about-us-info-item']}>
                <img src={feedbacksImg} alt="feedbacks" />
                <div className={styles['about-us-info-item-text']}>
                  <h3>100+</h3>
                  <p>Отзывы</p>
                </div>
              </div>             
            </div>
          </section>

          {/* GENIUS INFO */}

          <section className={styles['genius-info']}>
            <h2>Что такое <span>GENIUS?</span></h2>
            <p>Это платформа, которая позволяет преподавателям создавать онлайн-классы, с <br/> 
            помощью которых они могут хранить материалы курса онлайн; управлять заданиями, <br/> 
            викторинами и экзаменами; отслеживать сроки сдачи; результаты оценок и <br/> 
            предоставлять студентам обратную связь - все это в одном месте.</p>

            <div className={styles.twoUsers}>
              <div className={styles.tutorUser}>
                <h3>Для Репетиторов</h3>
                <RouterLink to='/instructor-register'>Начните занятия сегодня</RouterLink>
              </div>

              <div className={styles.studentUser}>
                <h3>Для Студентов</h3>
                <RouterLink to='/student-register'>Пройдите свои курсы</RouterLink>
              </div>
            </div>
          </section>

          {/* COURSES */}
          
          <CourseCategories/>
          

          {/* BEST TUTORS */}
          
          <section id='teachers' className={styles['best-tutors']}>
            <div className={styles['best-tutors-inner']}>
              <h2>Наши лучшие репетиторы</h2>
              <HomeTeacherSlider/>
            </div>
          </section>

          
        </div>

        {/* HOW IT WORKS */}

        <section id='howitworks' className={styles.how_it_works}>
            <img className={styles.circle1} src={circle1} alt='circle1'/>
            <img className={styles.circle2} src={circle2} alt='circle1'/>
            <img className={styles.circle3} src={circle3} alt='circle1'/>
            <img className={styles.circle4} src={circle4} alt='circle1'/>
            <h2>Как это работает?</h2>
            <p>Это один мощный онлайн-пакет программного обеспечения, который сочетает <br/> в себе все инструменты, необходимые для успешного управления школой или <br/> офисом.</p>
            <HomeGuideItem/>
        </section>

        {/* FEEDBACKS */}

        <section className={styles.feedbacks}>
          <h2>Отзывы</h2>
          <p>Это один мощный онлайн-пакет программного обеспечения, который сочетает в себе все <br/>инструменты, необходимые для успешного управления школой или офисом.</p>
          <HomeFeedbacksSlider/>
        </section>
        </div>
          )}

        {/* FOOTER */}
        <Footer/>
        </div>
        </div>
    </div>
  )
}
export default Home;



