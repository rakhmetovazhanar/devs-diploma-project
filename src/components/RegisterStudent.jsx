import React from 'react';
import Select from 'react-select';
import {useRef , useState , useEffect} from 'react';
import {faCheck , faTimes , faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logoBlue from '../images/Logo-blue.png';
import logoWhite from '../images/Logo-white.png';
import line from '../images/Line.png';
import line2 from '../images/Line2.png';
import instructorImg from '../images/regıstr-ımage1.png';
import styles from '../styles/RegisterStudent.module.css';
import {Link} from 'react-router-dom';
import LoginPage from './LoginPage';

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
                        <p className={styles.tologinpage}>У вас уже есть аккаунт? Войти 
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

            {/* Footer */}

            <footer className={styles.footer}>
                <div className={styles.startoffooter}>                   
                        <img className={styles.logoWhite} src={logoWhite} alt="logoWhite" />
                        <img className={styles.line} src={line} alt="line" />
                        <h2 className={styles.zoom}>Virtual Class  Zoom</h2>
                </div>

                <div className={styles.subscribe}>
                    <h3>Подпишитесь на нашу рассылку новостей</h3>

                    <div className={styles['subscribe-input']}>
                        <input type="email"  placeholder='Ваш Email'/>
                        <button type='submit'>Подписываться</button>
                    </div>
                </div>

                <div className={styles.endoffooter}>
                        <div className={styles.terms}>
                            <h4>Careers</h4>
                            <img src={line2} alt="line2" />
                            <h4>Privacy Policy</h4>
                            <img src={line2} alt="line2" />
                            <h4>Terms  &  Conditions</h4>
                            </div>

                        <div className={styles.tech}>
                            <h4>© 2024 Class Technologies Inc.</h4>
                        </div>
                    </div>
            </footer>
    
        
        </div>
    )
}

export default RegisterStudent;