import React from 'react';
import {useState} from 'react';
import styles from '../styles/RegisterInstructor.module.css';
import num1 from '../images/num1blue.svg';
import num2grey from '../images/num2grey.svg';
import num3grey from '../images/num3grey.svg';
import num1grey from '../images/num1grey.svg';
import num2blue from '../images/num2blue.svg';
import {useForm} from 'react-hook-form';
import logoBlue from '../images/Logo-blue.png';
import instructorImg from '../images/regıstr-ımage1.png';
import instructorImg2 from '../images/regıstr-ımage2.png';
import Footer from '../ui/Footer';

const RegisterInstructor = () => {
const form = useForm({
  mode: "onBlur",
});
const {register , control ,watch, getValues, handleSubmit, formState: { errors , isValid } , reset} = form;


const onSubmit= (data)=>{
    console.log('Form submitted' , data);
    alert(JSON.stringify(data));
    reset();
}
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logoBlue} alt="logoBlue" />
        </div>

        <div className={styles.registerBack}>
          <div className={styles.registerContent}>
            <div className={styles.registerContent__inner}>
              <h2>Создать аккаунт</h2>
              <p>*Все поля обязательны для заполнения, если не указано иное.</p>

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
                      Какого вы пола? (опционально)
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
                    <label htmlFor='number'>
                      *Ваш номер телефона
                    </label>
                    <input className={styles.reg_input}
                    type="text"
                    id='number'
                    {...register("number" , { required: true,
                      pattern: {
                          value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                          message : "Номер телефона недействителен!"
                      }
                    })} 
                    placeholder='+7' />
                    <div>{errors?.number && <p className={styles['error-text']}>Введите номер телефона!</p>}</div>
                  </div>
                </div>

                <div className={styles.group}>
                    <label htmlFor='exp'>
                      *Каков ваш опыт работы?
                    </label>
                    <div className={styles.expGroup}>
                      <div className={styles.expOne_Three}>
                        <input 
                        type="radio"
                        value='От 1 года до 3 лет'
                        {...register('exp', {
                          required: true
                        })} />
                        <p>От 1 года до 3 лет</p>
                      </div>

                      <div className={styles.expOne}>
                        <input 
                        type="radio"
                        value='1 год'
                        {...register('exp', {
                          required: true
                        })} />
                        <p>1 год</p>
                      </div>

                      <div className={styles.expNo}>
                        <input 
                        type="radio"
                        value='Нет опыта'
                        {...register('exp' , {
                          required: true
                        })} />
                        <p>Нет опыта</p>
                      </div>
                    </div>

                  </div>

                  <div className={styles.group}>
                    <label htmlFor='username'>
                    *Ваше имя пользователя
                    </label>
                    <input style={{width : '369px'}} className={styles.reg_input}
                    type="text"
                    id='username'
                    {...register("username", { required: true, minLength:{
                      value : 5,
                      message: 'Минимум 5 символов.'
                    } })}
                    autoComplete='off'
                    aria-describedby='uidnote' />
                    <div>{errors?.username && <p className={styles['error-text']}>{errors?.username?.message || 'Введите имя!'}</p>}</div>

                </div>

                <div className={styles.group}>
                    <label htmlFor='password'>
                    *Ваш пароль
                    </label>
                    <input style={{width : '369px'}} className={styles.reg_input}
                    type="text"
                    id='password'
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
                    *Повторите пароль
                    </label>
                    <input style={{width : '369px'}} className={styles.reg_input}
                    type="text"
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
