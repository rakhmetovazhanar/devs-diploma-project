import React from 'react';
import {useState, useContext} from 'react';
import styles from '../styles/RegisterInstructor.module.css';
import {useForm} from 'react-hook-form';
import logoBlue from '../images/Logo-blue.png';
import Footer from '../ui/Footer';
import Logo from '../ui/Logo';
import { useNavigate , Link} from 'react-router-dom';
import { UserContext } from './UserContext';


const RegisterInstructor = () => {
const {setUser } = useContext(UserContext);
const form = useForm({
  mode: "onBlur",
});
const {register , control ,watch, getValues, handleSubmit, formState: { errors , isValid } , reset} = form;
const history = useNavigate();
const [apiErrors, setApiErrors] = useState(null);

const onSubmit= async (data)=>{
  try {
    const response = await fetch('https://genuis.tech/api/register-teacher/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.status === 200 || response.status === 201) {
      history('/');
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
      console.log('Setting user in context:', {
        loggedIn: true,
        first_name: responseData.data.first_name,
        last_name: responseData.data.last_name,
        token: responseData.token,
        role: translatedRole
    });
      setUser({
      loggedIn: true,
      first_name: responseData.data.first_name,
      last_name : responseData.data.last_name,
      token: responseData.token,
      role: translatedRole
      });
      } else {
      console.error('Failed to register user');

      setApiErrors(responseData);
  }
  } catch (error) {
    console.error('Error registering user:', error);
  }
  console.log('Form submitted' , data);
    reset();
}
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
      <Link to='/'><Logo style={styles.logo}/></Link>
        <div className={styles.registerBack}>
          <div className={styles.registerContent}>
            <div className={styles.registerContent__inner}>
              <h2>Создать аккаунт</h2>
              <p>*Все поля обязательны для заполнения, если не указано иное.</p> <Link to='/login'>Войти </Link>

              <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div>{errors.first_name && <p className={styles['error-text']}>{errors.first_name?.message || 'Введите имя!'}</p>}</div>

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
                      *Укажите ваш возраст
                    </label>
                    <input className={styles.reg_input}
                    type="number"
                    id='age'
                    {...register("age" , { required: true,
                    })}  />
                    <div>{errors?.age && <p className={styles['error-text']}>Укажите свой возраст!</p>}</div>

                  </div>

                  <div className={styles.group}>
                    <label htmlFor='gender'>
                      Какого вы пола?
                    </label>
                    <div className={styles.genderGroup}>
                      <div className={styles.female}>
                        <input  
                        type="radio"
                        value='Женщина'
                        {...register('gender', {
                          required: "Выберите пол!"
                        })} />

                        <p>Женщина</p>
                      </div>

                      <div className={styles.male}>
                        <input 
                        type="radio"
                        value='Мужчина'
                        {...register("gender", {
                          required: "Выберите пол!"
                        })} />
                        <p>Мужчина</p>
                      </div>
                    </div>

                  </div>
                </div>

                <div className={styles.column}>
                  <div className={styles.group}>
                  <label htmlFor='city'>
                    Ваш город
                  </label>
                  <select 
                  {...register("city", { required: true})} 
                  className={styles.cities}>
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

                  <div className={styles.group}>
                    <label htmlFor='phone_number'>
                      *Ваш номер телефона
                    </label>
                    <input className={styles.reg_input}
                    type="text"
                    id='phone_number'
                    {...register("phone_number" , { required: true,
                      pattern: {
                          value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                          message : "Номер телефона недействителен!"
                      }
                    })} 
                    placeholder='+7' />
                    <div>{errors?.phone_number && <p className={styles['error-text']}>Введите номер телефона!</p>}</div>
                  </div> 

                
                  
                </div>

                  <div className={styles.group}>
                    <label htmlFor='experience'>
                      *Каков ваш опыт работы?
                    </label>
                    <div className={styles.expGroup}>
                      <div className={styles.expNo}>
                        <input 
                        type="radio"
                        value='Нет опыта'
                        {...register('experience', {
                          required: true
                        })} />
                        <p>Нет опыта</p>
                      </div>

                      <div className={styles.expOneToThree}>
                        <input 
                        type="radio"
                        value='До 3 лет'
                        {...register('experience', {
                          required: true
                        })} />
                        <p>До 3 лет</p>
                      </div>

                      <div className={styles.expThreeToFive}>
                        <input 
                        type="radio"
                        value='От 3 до 5 лет'
                        {...register('experience' , {
                          required: true
                        })} />
                        <p>От 3 до 5 лет</p>
                      </div>

                      <div className={styles.expMore}>
                        <input 
                        type="radio"
                        value='Больше'
                        {...register('experience' , {
                          required: true
                        })} />
                        <p>Больше</p>
                      </div>
                    </div>

                  </div>

                  <div className={styles.group}>
                    <label htmlFor='username'>
                    *Ваш адрес электронной почты
                    </label>
                    <input style={{width : '369px'}} className={styles.reg_input}
                    type="text"
                    id='username'
                    {...register("username", { required: true, minLength:{
                      value : 5,
                    } })}
                    autoComplete='off'
                    aria-describedby='uidnote' />
                    <div>{errors?.username && <p className={styles['error-text']}>{errors?.username?.message || 'Введите адрес электронной почты!'}</p>}</div>

                </div>

                <div className={styles.group}>
                    <label htmlFor='password'>
                    *Ваш пароль
                    </label>
                    <input style={{width : '369px'}} className={styles.reg_input}
                    type="password"
                    id='password'
                    autoComplete='off'
                    {...register("password", {required: true})}
                     />
                    <div>{errors?.password && <p className={styles['error-text']}>{errors?.password?.message || 'Придумайте пароль!'}</p>}</div>
                    {apiErrors && apiErrors.password && Array.isArray(apiErrors.password) && (
                        <div className={styles.errorContainer}>
                            <ul className={styles['error-list']}>
                                <li className={styles['error-text-pass']}>
                                    {apiErrors.password.join('. ')}
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className={styles.group}>
                    <label htmlFor='matchpassword'>
                    *Повторите пароль
                    </label>
                    <input style={{width : '369px'}} className={styles.reg_input}
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
            </div>
          </div>
        </div>

        <Footer/>
      </div>
    </div>
  )
}

export default RegisterInstructor;
