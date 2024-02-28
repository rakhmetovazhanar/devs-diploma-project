import styles from '../styles/LoginPage.module.css';
import Form from 'react-bootstrap/Form';
import {useState} from 'react';
import Footer from '../ui/Footer';
import {Link} from 'react-router-dom';
import { useForm  } from 'react-hook-form'
import Logo from './ui/Logo.jsx';
 
const LoginPage = () =>{
    const [saveUser , setSaveUser] = useState(true);
    const [user, setUser] = useState('t')
    const form = useForm({
        mode: "onBlur",
    });
    const {register , control , handleSubmit, formState: { errors , isValid , isSubmitting } , reset , getValues} = form;

   const onSubmit = (data, e) =>{
        e.preventDefault()
        if(user == 's') {
        // try {
        //     const response = await fetch('http://92.47.149.211:8000/api/get-students', {
        //       method: 'GET',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(data),
        //     });
            
        //     if (response.ok) {
        //       console.log('User registered successfully!');
        //     } else {
        //       console.error('Failed to register user');
        //     }
        // } catch (error) {
        //     console.error('Error registering user:', error);
        // }
        console.log(user)
        console.log(data)
    }
    else{
        // try {
        //     const response = await fetch('http://92.47.149.211:8000/api/get-teachers', {
        //       method: 'GET',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(data),
        //     });
            
        //     if (response.ok) {
        //       console.log('User registered successfully!');
        //     } else {
        //       console.error('Failed to register user');
        //     }
        // } catch (error) {
        //     console.error('Error registering user:', error);
        // }
        console.log(user)
        console.log(data)
    }
    }

    return(
        <div className={styles.wrap}>
            <div className={styles.container}>
                <Logo />
                <div className={styles.loginBack}>
                    <div className={styles.logincontent}>
                       <div className={styles.logincontent__inner}>
                            <h2>C возвращением!</h2>
                            <p>Начните пользоваться нашим замечательным <br/> сервисом</p>

                            <div className={styles.userTypes}>
                                <span className={`${user=='t' ? styles.activeuser : ''}  ${styles.userType}`} onClick={() => setUser('t')}>Teacher</span>
                                <span className={`${user=='s' ? styles.activeuser : ''}  ${styles.userType}`} onClick={() => setUser('s')}>Student</span>
                            </div>
                            <form onSubmit = {handleSubmit(onSubmit)}>
                                <div className={styles.group}>  
                                    <label htmlFor='email'>
                                        Ваш адрес электронной почты
                                    </label>
                                    <input
                                    placeholder='Введите свой адрес электронной почты'
                                    type="email"
                                    {...register("email" , {required: true})}
                                    id='email' />
                                     {errors.email?.type === "required" && (
                                        <p className={styles.error} role="alert">Email is required</p>
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
                                        <p className={styles.error} role="alert">Password is required</p>
                                    )}

                                </div>

                                <div className={styles.losePassword}>
                                    <div className={styles.checkbox}>
                                        <input type="checkbox" value={saveUser} /> Помнить меня
                                    </div>

                                    <h3><Link to='/forgot-password'>Забыли пароль?</Link></h3>
                                </div>

                                <button className={styles.loginButton}>Войти</button>
                                
                                <p className={styles.tosignUp}>У вас нет аккаунта? <Link to='/'>Зарегистрироваться</Link></p>

                            </form>
                            <p>{}</p>
                       </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default LoginPage;