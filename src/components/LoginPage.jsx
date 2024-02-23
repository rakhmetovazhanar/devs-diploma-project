import styles from '../styles/LoginPage.module.css';
import logoBlue from '../images/Logo-blue.png';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import Footer from '../ui/Footer';
import {Link} from 'react-router-dom';


const LoginPage = () =>{
    const [saveUser , setSaveUser] = useState(true);
    const handleChange =(data)=>{
        console.log(data);
    }

    return(
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.logo}>
                        <img src={logoBlue} alt="logoBlue" />
                </div>

                <div className={styles.loginBack}>
                    <div className={styles.logincontent}>
                       <div className={styles.logincontent__inner}>
                            <h2>C возвращением!</h2>
                            <p>Начните пользоваться нашим замечательным <br/> сервисом</p>

                            <form>
                                <div className={styles.group}>
                                    <label htmlFor='username'>
                                        Имя пользователя
                                    </label>
                                    <input
                                    placeholder='Введите свое имя пользователя'
                                    type="text"
                                    id='username' />
                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='password'>
                                        Пароль
                                    </label>
                                    <input
                                    placeholder='Введите свой пароль'
                                    type="password"
                                    id='password' />
                                </div>

                                <div className={styles.losePassword}>
                                    <div className={styles.checkbox}>
                                        <input type="checkbox" value={saveUser} onChange={() => handleChange("SaveUser")} /> Помнить меня
                                    </div>

                                    <h3>Забыли пароль?</h3>
                                </div>

                                <button className={styles.loginButton}>Войти</button>
                                <p className={styles.tosignUp}>У вас нет аккаунта? <Link to='/'>Зарегистрироваться</Link></p>

                            </form>
                       </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default LoginPage;