import React from 'react';
import styles from '../styles/HelpPage.module.css';
import { useForm  } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


const HelpPage = () => {

    const form = useForm({
        mode: "onBlur",
    });
    const history = useNavigate()
    const {register , handleSubmit, formState: { errors  } , reset} = form;
  return (
    <div className={styles.helpPage_inner}>
        <div className={styles.helpPage_content}>
            <form className={styles.helpForm}>
                <h2>Нужна Помощь</h2>
                <p>Обратитесь за консультацией к профессионалам</p>
                <div className={styles.group}>  
                    <label htmlFor='name'>
                        Полное имя
                    </label>
                    <input
                    placeholder='Введите свое полное имя'
                    type="name"
                    {...register("name" , {required: true})}
                    id='name' />
                        {errors.name?.type === "required" && (
                        <p className={styles.error} role="alert">Обязательно!</p>
                    )}
                </div>

                <div className={styles.group}>  
                    <label htmlFor='username'>
                        Ваш адрес электронной почты
                    </label>
                    <input
                    placeholder='Введите...'
                    type="email"
                    {...register("username" , {required: true})}
                    id='username' />
                        {errors.username?.type === "required" && (
                        <p className={styles.error} role="alert">Обязательно!</p>
                    )}
                </div>

                <div className={styles.group}>  
                    <label htmlFor='message'>
                        Ваше сообщение
                    </label>
                    <input
                    style={{height: '103px', marginBottom: '-38px'}}
                    type="text"
                    {...register("message" , {required: true})}
                    id='message' />
                        {errors.message?.type === "required" && (
                        <p className={styles.error} role="alert">Обязательно!</p>
                    )}
                </div>

                <button className={styles.send}>Отправить</button>
            </form>
        </div>
    </div>
  )
}

export default HelpPage;
