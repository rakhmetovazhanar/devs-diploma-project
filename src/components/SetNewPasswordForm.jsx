import React , {useState} from 'react'
import styles from '../styles/SetNewPasswordForm.module.css';
import {Link} from 'react-router-dom';
import Logo from '../ui/Logo';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';

const SetNewPasswordForm = () => {
    const [new_password, setNewPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const { token } = location.state; 
    const navigate = useNavigate()

    const handleSetNewPassword = async (e) => {
      e.preventDefault();
      if (new_password !== confirm_password) {
        setMessage('Passwords do not match');
        return;
      }

      try {
        const response = await axios.post(
          'https://genuis.tech/api/change-password/',
          { new_password: new_password, confirm_password: confirm_password },
          { headers: { Authorization: `Token ${token}` } }
        );
  
        if (response) {
          navigate('/success-reset-password', {state : {token}})
          console.log('Password changed successfully!');
        } else {
          console.error('Failed to change password');
        }
      } catch (error) {
        console.error('Error changing password:', error);
      }
    };
  
    return (
      <div className={styles.wrap}>
            <div className={styles.container}>
                <Logo style={styles.logo} />
                <Link to='/login'><button className={styles.toLogin}>Войти</button></Link>

                <div className={styles.setPwd}>
                    <div className={styles.setPwd_inner}>
                        <h2>Новый пароль</h2>
                        <p>Установите новый пароль для своей учетной записи, чтобы вы могли войти в систему</p>
                        <form onSubmit={handleSetNewPassword}>
                            <div className={styles.group}>
                              <label htmlFor='new_password'>
                              Введите новый пароль                                  
                              </label>
                                        
                              <input
                              type="password"
                              id='new_password'
                              value={new_password}
                              autoComplete='off'
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                              />
                            </div>
                            <div className={styles.group}>
                              <label htmlFor='confirm_password'>
                              Подтвердите пароль                                  
                              </label>
                                        
                              <input
                              type="password"
                              id='confirm_password'
                              value={confirm_password}
                              autoComplete='off'
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                              />
                            </div>
                            <button type='submit' className={styles.button}>Обновить пароль</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </div>
      </div>
    );
  };

export default SetNewPasswordForm;

