import React , {useState} from 'react'
import styles from '../styles/SuccessResetPassword.module.css';
import {Link} from 'react-router-dom';
import Logo from '../ui/Logo';
import {useNavigate } from 'react-router-dom';
import successImg from '../images/success.svg';

const SuccessResetPassword = () => {
  return (
    <div className={styles.wrap}>
            <div className={styles.container}>
                <Logo style={styles.logo} />

                <div className={styles.successReset}>
                    <div className={styles.successReset_inner}>
                       <img src={successImg} alt="success"/>
                        <h2>Успешно</h2>
                        <p>Ваш пароль был успешно сброшен</p>
                        <Link to='/login'><button>Продолжить</button></Link>
                    </div>
                </div>
            </div>
      </div>
  )
}

export default SuccessResetPassword;
