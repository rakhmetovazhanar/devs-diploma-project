import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/TeacherHeader.module.css';
import burgerImg from '../../images/burgerImg.svg';
import {Link} from 'react-router-dom';
import {UserContext } from '../../components/UserContext';
import line2 from '../../images/line2.svg';
import SideBar from './SideBar';


const TeacherHeader = ({headerTitle}) => {
    const [isActiveDropdown, setIsActiveDropdown] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const {user} = useContext(UserContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleDropdownClick = () => {
        setIsActiveDropdown(!isActiveDropdown);
        setIsRotated(!isRotated);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); 
    };

    const closeHandler =()=>{
        setIsSidebarOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (isSidebarOpen && !event.target.closest(`.${styles.sidebar}`) && !event.target.closest(`.${styles.burgerSide}`)) {
            closeHandler();
          }
        };
        if (isSidebarOpen) {
          document.addEventListener('click', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [isSidebarOpen]); 
  return (
    <div className={styles.header_inner}>
        <div className={styles.burgerSide}>
            <img onClick={toggleSidebar} src={burgerImg} alt="burger"  />
            {isSidebarOpen && <SideBar closeSideBar = {closeHandler} />}
            <h2>{headerTitle}</h2>
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
                <Link to='/teacher-profile'>Мой профиль</Link>
                </li>
                <li>
                <Link to='/teacher-edit-page'>Редактировать </Link>
                </li>
                <li>
                <Link to='/teacher-delete-account'>Удалить аккаунт</Link>
                </li>
                <li>
                <Link to='/logout'>Выйти</Link>
                </li>
            </ul>}
        </div>
    </div>
  )
}

export default TeacherHeader;
