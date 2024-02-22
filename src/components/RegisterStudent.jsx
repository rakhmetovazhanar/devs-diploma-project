import React from 'react';
import Select from 'react-select';
import {useRef , useState , useEffect} from 'react';
import {faCheck , faTimes , faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logoBlue from '../images/Logo-blue.png';
import instructorImg from '../images/regıstr-ımage1.png';
import styles from '../styles/RegisterStudent.module.css';
import {Link} from 'react-router-dom';
import LoginPage from './LoginPage';
import Footer from '../ui/Footer';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const RegisterStudent = () =>{
    const userRef = useRef();
    const errRef = useRef();
    

    const [user, setUser] = useState('');
    const [validName , setValidName] = useState(false);
    const [userFocus , setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd , setValidPwd] = useState(false);
    const [pwdFocus , setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch , setValidMatch] = useState(false);
    const [matchFocus , setMatchFocus] = useState(false);

    const [errMsg , setErrMsg] = useState('');
    const [success , setSuccess] = useState(false);

    useEffect(() =>{
        userRef?.current?.focus();
    },[]);

    useEffect(() =>{
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() =>{
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);

    }, [pwd , matchPwd]);

    useEffect(() =>{
        setErrMsg('');
    }, [user , pwd , matchPwd]);

    return(
        <div className={styles.wrap}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src={logoBlue} alt="logoBlue" />
                </div>

                <div className={styles.createUser}>
                    <section>
                        <p ref = {errRef} 
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live='assertive'>
                            {errMsg}
                        </p>

                        <h1 className={styles.title}>Создать аккаунт</h1>
                        <p className={styles.tologinpage}>У вас уже есть аккаунт? 
                        {/* <Link to={<LoginPage/>}>Войти </Link> */}
                        </p>

                        {/* FORM */}

                        <form>
                            <div className={styles.group}>
                                <label htmlFor='username'>
                                    Ваше имя пользователя
                                </label>
                                
                                <input
                                type="text"
                                id='username' />
                            </div>

                            <div className={styles.column}>
                                <div className={styles.group}>
                                    <label htmlFor='city'>
                                        Ваш город
                                    </label>
                                    <input type="text"
                                    id='city' />
                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='number'>
                                        Ваш номер телефона
                                    </label>
                                    <br/>
                                    <input
                                    type="text"
                                    id='number' />
                                </div>

                            </div>

                            <div className={styles.group}>
                                    <label htmlFor='password'>
                                    Ваш пароль
                                    </label>
                                    <br/>
                                    <input
                                    type="password"
                                    id='password' />
                                </div>

                            <div className={styles.group}>
                                    <label htmlFor='matchpassword'>
                                    Повторите пароль
                                    </label>
                                    <br/>
                                    <input
                                    type="password"
                                    id='matchpassword' />
                            </div>

                            <button className={styles.button} type='submit'>Зарегистрироваться</button>
                            
                        </form>
                    </section>

                    <div className={styles.instructor_img}>
                        <img src={instructorImg} alt="instructor image" />
                    </div>
                </div>
            </div>

            <Footer/>
    
        
        </div>
    )
}

export default RegisterStudent;