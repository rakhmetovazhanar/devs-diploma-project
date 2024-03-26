import React from 'react'
import {useState, useContext} from 'react';
import styles from '../styles/Home.module.css';
import Logo from '../ui/Logo';
import { Link as RouterLink } from 'react-router-dom';
import up from '../images/Up.svg';
import SearchButton from '../ui/SearchButton';
import SearchResults from '../ui/SearchResults';
import homeImg from '../images/homeImg.svg';
import studentsImg from '../images/studentsImg.svg';
import tutorsImg from '../images/tutorsImg.svg';
import subjectsImg from '../images/subjectsImg.svg';
import feedbacksImg from '../images/feedbacksImg.svg';
import CourseItem from '../ui/CourseItem';
import englishImg from '../images/english.svg';
import javaImg from '../images/java.svg';
import frontendImg from '../images/frontend.svg';
import spainImg from '../images/spain.svg';
import koreanImg from '../images/korean.svg';
import mathImg from '../images/math.svg';
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

const Home = () => {
  const {user} = useContext(UserContext);
  const [results , setResults] = useState([]);
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const handleDropdownClick = () => {
    setIsActiveDropdown(!isActiveDropdown);
    setIsRotated(!isRotated);
  };

 
  return (
    <div className={styles.wrap}>
        <div className={styles.container}>

          {/* HEADER */}

          <div className={styles.header}>
          <RouterLink to='/'><Logo style={styles.logo}/></RouterLink>

            <ul className={styles.navLink}>
              <li className={styles.navLink_item}>
              <ScrollLink to="courses" smooth={true} duration={500} hashSpy={true}>Курсы</ScrollLink>
              </li>
              <li className={styles.navLink_item}>
              <ScrollLink to="teachers" smooth={true} duration={500} hashSpy={true}>Репетиторы</ScrollLink>
              </li>
              <li className={styles.navLink_item}>
              <ScrollLink to="aboutus" smooth={true} duration={500} hashSpy={true}>О нас</ScrollLink>
              </li>
              <li className={styles.navLink_item}>
              <ScrollLink to="howitworks" smooth={true} duration={500} hashSpy={true}>Как это работает</ScrollLink>
              </li>
              {user.role === 'Репетитор' && (
                <li className={styles.my_courses}>
                <RouterLink to="/my-courses">Мои курсы</RouterLink>
                </li>
              )}
              {user.role === 'Студент' && (
                <li className={styles.my_lessons}>
                <RouterLink to="/student-courses">Мои курсы</RouterLink>
                </li>
              )}
            </ul>

            {user.loggedIn ? (
            <>
              <div onClick={handleDropdownClick} className={styles.users_profile}>
                <div className={styles.users_profile_info}>
                  <div className={styles.users_name_role}>
                    <div className={styles.users_name_surname}>
                      <div className={styles.users_name}>{user.first_name}</div>
                      <div>{user.last_name}</div>
                    </div>
                    <div className={styles.users_role}>{user.role}</div>
                  </div> 
                
                <img style={{ transform: isRotated ? 'rotate(180deg)' : 'none' }} src={line2} alt='line2'/>
                </div>

                {isActiveDropdown && 
                <ul>
                  {user.role === 'Репетитор' && (
                     <>
                        <li>
                          <RouterLink to='/teacher-profile'>Мой профиль</RouterLink>
                        </li>
                        <li>
                          <RouterLink to='/teacher-edit-page'>Редактировать </RouterLink>
                        </li>
                        <li>
                          <RouterLink to='/teacher-delete-account'>Удалить аккаунт</RouterLink>
                        </li>
                        
                      </>
                  )}
                  {user.role === 'Студент' && (
                     <>
                        <li>
                          <RouterLink to='/student-profile'>Мой профиль</RouterLink>
                        </li>
                        <li>
                          <RouterLink to='/student-edit-profile'>Редактировать </RouterLink>
                        </li>
                        <li>
                          <RouterLink to='/student-delete-account'>Удалить аккаунт</RouterLink>
                        </li>
                      </>
                  )}
                  {/* <li>
                    <RouterLink to='/teacher-profile'>Мой профиль</RouterLink>
                  </li>
                  <li>
                    <RouterLink to='/edit-profile'>Редактировать </RouterLink>
                  </li>  */}
                  <li>
                    <RouterLink to='/logout'>Выйти</RouterLink>
                  </li>
                </ul>}
              </div>
            </>
           
            ) : (
              <div className={styles.buttons}>
              <RouterLink to='/login'><button className={styles.loginLink}>Войти</button></RouterLink>
              <button onClick={(e) => setIsActiveDropdown(!isActiveDropdown)}  className={styles.registerLink}><img src={up} alt='register'/>Зарегистрироваться
                {isActiveDropdown &&
                <ul>
                  <li>
                    <RouterLink to='/instructor-register'>Преподаватель</RouterLink>
                  </li>
                  <li>
                    <RouterLink to='/student-register'>Студент</RouterLink>
                  </li>
              </ul>}
              </button>
              {/* <h1>{user.username}</h1> */}
            </div>
            )}
          
          </div>


          {/* SEARCH COURSER PART */}

          <section  className={styles.searchCourses}>
            <div className={styles.searchCourses_inner}>
              <div className={styles.searchCourses_content}>
                <h1>Заниматься с репетитором <br/> стало намного проще</h1>
                <p>Это интересная платформа , которая научит вас более <br/> интерактивно.</p>
                <SearchButton setResults={setResults}/>
                {results && results.length > 0 && <SearchResults results={results}/>}
              </div>
              <img className={styles.homeImg} src={homeImg} alt="home"/>
            </div>
          </section>

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

          <section id='courses' className={styles.courses}>
            <h3>Выберите любимое курс из высшей категории</h3>
            <div className={styles.courseItems}>
              <CourseItem img={englishImg} name={'Англиский язык'} desc={'Cпециально разработанная система, состоящая из совокупности занятий по проработке всех языковых навыков. '}/>
              <CourseItem img={javaImg} name={'Java'} desc={'Научим писать код, создавать программы. Онлайн и оффлайн занятия. Поддержка менторов.'}/>
              <CourseItem img={frontendImg} name={'Front End'} desc={'Научим писать код, создавать программы. Онлайн и оффлайн занятия. Поддержка менторов.'}/>
              <CourseItem img={spainImg} name={'Испанский язык'} desc={'Cпециально разработанная система, состоящая из совокупности занятий по проработке всех языковых навыков. '}/>
              <CourseItem img={koreanImg} name={'Корейский язык'} desc={'Cпециально разработанная система, состоящая из совокупности занятий по проработке всех языковых навыков. '}/>
              <CourseItem img={mathImg} name={'Математика'} desc={'Уроки математики, основы программирования,  математический тренажер, игровое обучение.'}/> 
            </div>
          </section>

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

        {/* FOOTER */}
        <Footer/>
    </div>
  )
}
export default Home;



