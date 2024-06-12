import React , {useContext , useEffect} from 'react'
import Logo from '../../ui/Logo';
import {Link, useNavigate} from 'react-router-dom';
import {UserContext } from '../../components/UserContext';
import axios from 'axios';
import styles from '../../styles/StudentDeleteAccount.module.css';

const StudentDeleteAccount = () => {
const history = useNavigate();
const {user, setUser } = useContext(UserContext); 
const token = localStorage.getItem('token');

const deleteStudent = async (studentId) => {
  try {
    const response = await axios.delete(`https://genuis.tech/api/delete-student-profile/${studentId}`, {
      headers: {
        Authorization: `Token ${token}`,
       'Content-Type' : 'application/json'
      }
    });
    console.log('Student deleted successfully');
    setUser(null);
    history('/login')
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

const cancelDelete = () => {
  history('/');
};

const handleDeleteAccount = () => {
  deleteStudent(user.user_id);
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


export default StudentDeleteAccount;
