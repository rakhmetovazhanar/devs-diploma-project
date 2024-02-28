import React from 'react'
import styles from '../styles/ForgotPassword.module.css';
import {Link} from 'react-router-dom';
import Logo from './ui/Logo';

const ForgotPassword = () => {
  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <Logo />
                <Link to='/login'><button className={styles.toLogin}>Войти</button></Link>

                <div className={styles.forgotPwd}>
                    <div className={styles.forgetPwd_inner}>
                        <h2>Забыли пароль</h2>
                        <p>Введите свой адрес электронной почты для процесса верификации, <br/> мы вышлем 4-значный код на ваш электронный адрес.</p>
                        <div className={styles.group}>
                                    <label htmlFor='email'>
                                        Ваш адрес электронной почты                                   
                                    </label>
                                    
                                    <input
                                    type="email"
                                    id='email'
                                    // {...register("email", { required: true})}
                                    autoComplete='off'
                                    aria-describedby='uidnote'
                                    />
                                    {/* <div>{errors?.email && <p className={styles['error-text']}>{errors?.email?.message || 'Введите адрес электронной почты!'}</p>}</div> */}
                        </div>
                        <button className={styles.button}>Продолжить</button>
                    </div>
                </div>
            
        </div>
    </div>
  )
}

export default ForgotPassword;
