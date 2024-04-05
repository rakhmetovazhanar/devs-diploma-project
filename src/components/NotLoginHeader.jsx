import React, {useState,useContext} from 'react'
import { UserContext } from './UserContext';
import styles from '../styles/Home.module.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; 
import Logo from '../ui/Logo';
import line2 from '../images/line2.svg';
import up from '../images/Up.svg';



const NotLoginHeader = ({showNavLinks}) => {
    const {user} = useContext(UserContext);
    const [isActiveDropdown, setIsActiveDropdown] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
   
    
    const handleDropdownClick = () => {
        setIsActiveDropdown(!isActiveDropdown);
        setIsRotated(!isRotated);
    };

    return (
    <div className={styles.header_inner}>
          {/* HEADER */}

         
              <RouterLink to='/'><Logo style={styles.logo}/></RouterLink>

                <ul className={styles.navLink} >
                    {showNavLinks && (
                        <>
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
                        </>
                    )}
                  
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
  )
}

export default NotLoginHeader;
