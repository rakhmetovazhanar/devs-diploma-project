import React , {useState} from 'react'
import styles from '../styles/ForgotPassword.module.css';
import {Link} from 'react-router-dom';
import Logo from '../ui/Logo';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import VerifyCodeForm from './VerifyCodeForm';


const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const history = useNavigate()


    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://genuis.tech/api/forgot-password/', { username });
          history(
           '/verify-code-form',
            {state: { username }} // Pass username as state
          );
        } catch (error) {
        }
      };

  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
                <Link to='/'><Logo style={styles.logo}/></Link>
                <Link to='/login'><button className={styles.toLogin}>Войти</button></Link>

                <div className={styles.forgotPwd}>
                    <div className={styles.forgetPwd_inner}>
                        <h2>Забыли пароль</h2>
                        <p>Введите свой адрес электронной почты для процесса верификации, <br/> мы вышлем 4-значный код на ваш электронный адрес.</p>
                        <form onSubmit={handleForgotPassword}>
                            <div className={styles.group}>
                              <label htmlFor='username'>
                                  Ваш адрес электронной почты                                   
                              </label>
                                        
                              <input
                              type="email"
                              id='username'
                              autoComplete='off'
                              aria-describedby='uidnote'
                              onChange={(e)=> setUsername(e.target.value)}
                              required
                              />
                            </div>
                            <button type='submit' className={styles.button}>Продолжить</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            
        </div>
    </div>
  )
}

export default ForgotPassword;
