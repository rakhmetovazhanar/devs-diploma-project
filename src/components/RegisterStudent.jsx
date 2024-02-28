import React from 'react';
import {useRef , useState , useEffect} from 'react';
import instructorImg from '../images/regıstr-ımage1.png';
import styles from '../styles/RegisterStudent.module.css';
import {Link} from 'react-router-dom';
import Footer from '../ui/Footer';
import {useForm , FieldValues} from 'react-hook-form';
import { DevTool} from '@hookform/devtools';
import Logo from './ui/Logo';


// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterStudent = () =>{
    const form = useForm({
        mode: "onBlur",
    });
    const {register , control , handleSubmit, formState: { errors , isValid , isSubmitting } , reset , getValues} = form;
    

    const onSubmit= async (data)=>{
        console.log(data)
        try {
            const response = await fetch('http://92.47.149.211:8000/api/register-student', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            
            if (response.ok) {
              console.log('User registered successfully!');
            } else {
              console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }

        // fetch("http://localhost:8000/api/register-student/students.json", {
        //     method : "POST",
        //     body: JSON.stringify({
        //         user: data
        //     })
        // })
        // console.log('Form submitted' , data);
        // alert(JSON.stringify(data));
        reset();
    }

    return(
        <div className={styles.wrap}>
            <div className={styles.container}>
            <Logo/>

                <div className={styles.createUser}>
                    <section className={styles.createUser__inner}>
                        <h1 className={styles.title}>Создать аккаунт</h1>
                        <p className={styles.tologinpage}>У вас уже есть аккаунт? 
                        <Link to='/login'>Войти </Link>
                        </p>

                        {/* FORM */}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.column}>
                                <div className={styles.group}>
                                    <label htmlFor='name'>
                                    *Имя
                                    </label>
                                    <input className={styles.reg_input}
                                    type="text"
                                    {...register("name" , {required: true})}
                                    autoComplete='off'
                                    id='name' />
                                    <div>{errors?.name && <p className={styles['error-text']}>{errors?.name?.message || 'Введите имя!'}</p>}</div>

                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='surname'>
                                    *Фамилия
                                    </label>
                                    <input className={styles.reg_input}
                                    type="text"
                                    {...register("surname" , {required: true})}
                                    id='surname' />
                                    <div>{errors?.surname && <p className={styles['error-text']}>Введите фамилию!</p>}</div>

                                </div>
                            </div>

                            <div className={styles.column}>

                            <div className={styles.group}>
                                    <label htmlFor='age'>
                                        Укажите ваш возраст
                                    </label>
                                    <br/>
                                    <input
                                    type="number"
                                    id='age'
                                    {...register("age" , { required: true,
                                    })} 
                                    />
                                    <div>{errors?.age && <p className={styles['error-text']}>Укажите свой возраст!</p>}</div>

                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='city'>
                                        Ваш город
                                    </label>
                                    {/* <input 
                                    type="text"
                                    id='city'
                                    {...register("city")} /> */}
                                    <select {...register("city", { required: true})} className={styles.cities}>
                                        <option value=""></option>
                                        <option value="Алматы">Алматы</option>
                                        <option value="Астана">Астана</option>
                                        <option value="Актау">Актау</option>
                                        <option value="Актобе">Актобе</option>
                                        <option value="Атырау">Атырау</option>
                                        <option value="Караганда">Караганда</option>
                                        <option value="Кокшетау">Кокшетау</option>
                                        <option value="Костанай">Костанай</option>
                                        <option value="Кызылорда">Кызылорда</option>
                                        <option value="Павлодар">Павлодар</option>
                                        <option value="Петропавловск">Петропавловск</option>
                                        <option value="Семей">Семей</option>
                                        <option value="Талдыкорган">Талдыкорган</option>
                                        <option value="Тараз">Тараз</option>
                                        <option value="Туркестан">Туркестан</option>
                                        <option value="Уральск">Уральск</option>
                                        <option value="Усть-Каменогорск">Усть-Каменогорск</option>
                                    </select>
                                    <div>{errors?.city && <p className={styles['error-text']}>Выберите город!</p>}</div>
                                    

                                </div>

                            

                            </div>

                            <div className={styles.column}>

                                <div className={styles.group}>
                                    <label htmlFor='email'>
                                        *Ваш адрес электронной почты                                   
                                    </label>
                                    
                                    <input
                                    type="email"
                                    id='email'
                                    {...register("email", { required: true})}
                                    autoComplete='off'
                                    aria-describedby='uidnote'
                                    />
                                    <div>{errors?.email && <p className={styles['error-text']}>{errors?.email?.message || 'Введите адрес электронной почты!'}</p>}</div>

                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='number'>
                                        Ваш номер телефона
                                    </label>
                                    <br/>
                                    <input
                                    type="text"
                                    id='number'
                                    {...register("number" , { required: true,
                                    pattern: {
                                        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                                        message : "Номер телефона недействителен!"
                                    }
                                    })} 
                                    placeholder='+7'
                                    />
                                    <div>{errors?.number && <p className={styles['error-text']}>Введите номер телефона!</p>}</div>

                                </div>
                            </div>

                            <div className={styles.group}>
                                    <label htmlFor='password'>
                                    Ваш пароль
                                    </label>
                                    <br/>
                                    <input
                                    type="password"
                                    id='password'
                                    autoComplete='off'
                                    {...register("password", {required: true, 
                                        minLength:{
                                            value : 4,
                                            message: "Пароль должен содержать не менее 4 символов!"
                                        }
                                        })} />
                                    <div>{errors?.password && <p className={styles['error-text']}>{errors?.password?.message || 'Придумайте пароль!'}</p>}</div>
                                    
                                </div>

                            <div className={styles.group}>
                                    <label htmlFor='matchpassword'>
                                    Повторите пароль
                                    </label>
                                    <br/>
                                    <input
                                    type="password"
                                    autoComplete='off'
                                    id='matchpassword'
                                    {...register("matchpassword", {required: true,
                                    validate : (value) => value === getValues("password") || "Пароль не сходится!",
                                    })} />
                                    <div>{errors?.matchpassword && <p className={styles['error-text']}>Пароль не сходится!</p>}</div>
                                    
                            </div>

                            <button className={styles.button} disabled={!isValid} type='submit'>Зарегистрироваться</button>
                            

                            
                        </form>
                        <DevTool control={control}/>
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