import React , {useContext , useEffect} from 'react'
import Logo from '../../ui/Logo';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext } from '../../components/UserContext';
import axios from 'axios';
import styles from '../../styles/TeacherDeleteAccount.module.css';

const TeacherDeleteAccount = () => {
const history = useNavigate();
const {user, setUser } = useContext(UserContext); 
const token = localStorage.getItem('token');

const deleteTeacher = async (teacherId) => {
  try {
    const response = await axios.delete(`http://134.209.250.123:8000/api/delete-teacher-profile/${teacherId}`, {
      headers: {
        Authorization: `Token ${token}`,
       'Content-Type' : 'application/json'
      }
    });
    console.log('Teacher deleted successfully');
    setUser(null);
    history('/login')
  } catch (error) {
    console.error('Error deleting teacher:', error);
  }
};

const cancelDelete = () => {
  history('/');
};

const handleDeleteAccount = () => {
  deleteTeacher(user.user_id);
};


  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <Link to='/'><Logo style={styles.logo}/></Link>

            <div className={styles.delete}>
                <div className={styles.delete_inner}>
                    <h2>Вы хотите удалить свой аккаунт?</h2>
                    <p>Вы уверены?</p>
                    <div className={styles.delete_inner_buttons}>
                        <button onClick={cancelDelete} className={styles.cancel}>Отмена</button>
                        <button onClick={handleDeleteAccount} className={styles.delete_btn}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


export default TeacherDeleteAccount;
