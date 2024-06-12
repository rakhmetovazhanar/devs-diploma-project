import React , {useContext , useEffect} from 'react'
import Logo from '../ui/Logo';
import styles from '../styles/LogoutPage.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const LogoutPage =  () => {
const history = useNavigate();
const { setUser } = useContext(UserContext); 
const cancelLogout=()=>{
  history('/')
}
const token = localStorage.getItem('token')

const handleLogout = async () => {
    try {
      if (!token) {
        console.error('Token is missing'); 
        return;
      }

      const response = await axios.post('https://134.209.250.123:8000/api/logout/', null, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setUser(null);
        localStorage.removeItem('token');
        console.log('Logged out successfully');
        history('/login');
      } else {
        console.error('Logout failed:', response.data); 
      }
    } catch (error) {
      console.error('Logout failed:', error); 
    }
  };


  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <Link to='/'><Logo style={styles.logo}/></Link>

            <div className={styles.logout}>
                <div className={styles.logout_inner}>
                    <h2>Вы пытаетесь выйти из системы</h2>
                    <p>Вы уверены?</p>
                    <div className={styles.logout_inner_buttons}>
                        <button onClick={cancelLogout} className={styles.cancel}>Отмена</button>
                        <button onClick={handleLogout} className={styles.logout_btn}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


export default LogoutPage;
