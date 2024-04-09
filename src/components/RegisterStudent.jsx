import React from 'react';
import {useRef , useState , useContext} from 'react';
import instructorImg from '../images/regıstr-ımage1.png';
import styles from '../styles/RegisterStudent.module.css';
import {Link} from 'react-router-dom';
import Footer from '../ui/Footer';
import {useForm , FieldValues} from 'react-hook-form';
import { DevTool} from '@hookform/devtools';
import Logo from '../ui/Logo';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';


const RegisterStudent = () =>{
    const {setUser } = useContext(UserContext);
    const history = useNavigate()

    const form = useForm({
        mode: "onBlur",
    });
    const {register , control , handleSubmit, formState: { errors , isValid , isSubmitting } , reset , getValues} = form;

    const onSubmit= async (data)=>{
       
        try {
            const response = await fetch('http://134.209.250.123:8000/api/register-student/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            
            if (response.ok) {
                console.log('User registered successfully!');
                const responseData = await response.json();
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
                role: translatedRole
                });
                history.push('/');
            } else {
              console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
        reset();
    }

    return(
        <div className={styles.wrap}>
            <div className={styles.container}>
            <Link to='/'><Logo style={styles.logo}/></Link>
                <div className={styles.createUser}>
                    <section className={styles.createUser__inner}>
                        <h1 className={styles.title}>Создать аккаунт</h1>
                        <p className={styles.tologinpage}>У вас уже есть аккаунт? 
                        <Link to='/login'>Войти </Link>
                        </p>

                        {/* FORM */}

                        <form className={styles.register_form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.column}>
                                <div className={styles.group}>
                                    <label htmlFor='first_name'>
                                    *Имя
                                    </label>
                                    <input className={styles.reg_input}
                                    type="text"
                                    {...register("first_name" , {required: true})}
                                    autoComplete='off'
                                    id='first_name' />
                                    <div>{errors?.first_name && <p className={styles['error-text']}>{errors?.first_name?.message || 'Введите имя!'}</p>}</div>

                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='last_name'>
                                    *Фамилия
                                    </label>
                                    <input className={styles.reg_input}
                                    type="text"
                                    {...register("last_name" , {required: true})}
                                    id='last_name' />
                                    <div>{errors?.last_name && <p className={styles['error-text']}>Введите фамилию!</p>}</div>

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
                                    id='username'
                                    {...register("username", { required: true})}
                                    autoComplete='off'
                                    aria-describedby='uidnote'
                                    />
                                    <div>{errors?.email && <p className={styles['error-text']}>{errors?.email?.message || 'Введите адрес электронной почты!'}</p>}</div>

                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='phone_number'>
                                        Ваш номер телефона
                                    </label>
                                    <br/>
                                    <input
                                    type="text"
                                    id='phone_number'
                                    {...register("phone_number" , { required: true,
                                    pattern: {
                                        value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                                        message : "Номер телефона недействителен!"
                                    }
                                    })} 
                                    placeholder='+7'
                                    />
                                    <div>{errors?.phone_number && <p className={styles['error-text']}>Введите номер телефона!</p>}</div>

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