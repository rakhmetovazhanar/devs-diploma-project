 import styles from '../styles/LoginPage.module.css';
import {useState, useContext} from 'react';
import Footer from '../ui/Footer';
import {Link} from 'react-router-dom';
import { useForm  } from 'react-hook-form'
import Logo from '../ui/Logo';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import {jwtDecode} from 'jwt-decode';

const LoginPage = () =>{
    const [saveUser , setSaveUser] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [userType, setUserType] = useState('t');
    const {setUser } = useContext(UserContext);
    const form = useForm({
        mode: "onBlur",
    });
    const history = useNavigate()
    const {register , handleSubmit, formState: { errors  } , reset} = form;

   const onSubmit = async (data, e) =>{

    e.preventDefault();
    try {
      const response = await fetch(
        userType === "s"
          ? "http://134.209.250.123:8000/api/login-student/"
          : "http://134.209.250.123:8000/api/login-teacher/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("User logged in successfully!");
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        const token = responseData.token;
        console.log(responseData.data.id)

        // const decodedToken = jwtDecode(token);

        // const userId = userType === "s" ? decodedToken.student_id : decodedToken.teacher_id;


        const translateRoleToRussian = (role) => {
          switch (role) {
            case 'student':
              return 'Студент';
            case 'teacher':
              return 'Репетитор';
            default:
              return role;
          }
        };

        const translatedRole = translateRoleToRussian(responseData.role);
        setUser({
          loggedIn: true,
          first_name: responseData.data.first_name,
          last_name : responseData.data.last_name,
          token: responseData.token,
          role: translatedRole,
          user_id: responseData.data.id
        });
        history('/');
      } else {
        console.error('Failed to login user');
        setErrorMessage('Введен неверный логин или пароль');
        reset();
      }
    } catch (error) {
      console.error('Error login user:', error);
      setErrorMessage('Произошла ошибка во время входа. Пожалуйста, попробуйте еще раз.');
    }
    console.log(userType);
    console.log(data);
  
    
    }

    return(
        <div className={styles.wrap}>
            <div className={styles.container}>
            <Link to='/'><Logo style={styles.logo}/></Link>                <div className={styles.loginBack}>
                    <div className={styles.logincontent}>
                       <div className={styles.logincontent__inner}>
                            <h2>C возвращением!</h2>
                            <p>Начните пользоваться нашим замечательным <br/> сервисом</p>

                            <div className={styles.userTypes}>
                                <span className={`${userType=='t' ? styles.activeuser : ''}  ${styles.userType}`} onClick={() => setUserType('t')}>Преподаватель</span>
                                <span className={`${userType=='s' ? styles.activeuser : ''}  ${styles.userType}`} onClick={() => setUserType('s')}>Студент</span>
                            </div>
                            <form onSubmit = {handleSubmit(onSubmit)}>
                                <div className={styles.group}>  
                                    <label htmlFor='username'>
                                        Ваш адрес электронной почты
                                    </label>
                                    <input
                                    placeholder='Введите свой адрес электронной почты'
                                    type="email"
                                    {...register("username" , {required: true})}
                                    id='username' />
                                     {errors.username?.type === "required" && (
                                        <p className={styles.error} role="alert">Обязательно!</p>
                                    )}

                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='password'>
                                        Пароль
                                    </label>
                                    <input
                                    placeholder='Введите свой пароль'
                                    autoComplete='off'
                                    type="password"
                                    {...register("password" , {required: true})}
                                    id='password' />
                                     {errors.password?.type === "required" && (
                                        <p className={styles.error} role="alert">Обязательно!</p>
                                    )}

                                </div>

                                <div className={styles.losePassword}>
                                    <div className={styles.checkbox}>
                                        <input type="checkbox" value={saveUser} /> Помнить меня
                                    </div>

                                    <h3><Link to='/forgot-password'>Забыли пароль?</Link></h3>
                                </div>

                                <button className={styles.loginButton}>Войти</button>
                                {errorMessage && <p className={styles.login_error}>Введен неверный логин или пароль</p>}
                                
                                <p className={styles.tosignUp}>У вас нет аккаунта? <Link to='/login'>Зарегистрироваться</Link></p>

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