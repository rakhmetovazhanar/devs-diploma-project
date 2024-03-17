import React , {useState, useContext} from 'react';
import styles from '../../styles/AddCourse.module.css';
import burgerImg from '../../images/burgerImg.svg';
import {Link} from 'react-router-dom';
import { UserContext } from '../../components/UserContext';
import line2 from '../../images/line2.svg';
import Footer from '../../ui/Footer';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import categories from '../courseCategories';


const AddCourse = () => {
    const [isActiveDropdown, setIsActiveDropdown] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const {user} = useContext(UserContext);
    const form = useForm({
        mode: "onBlur",
    });
    const {register , handleSubmit, formState: { errors}, reset} = form;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDropdownClick = () => {
      setIsActiveDropdown(!isActiveDropdown);
      setIsRotated(!isRotated);
    };

    const token = localStorage.getItem('token');

    const onSubmit = async (data) => {
        console.log(data)
        setIsSubmitting(true);
        try {
          const formData = {...data, teacher_id: user.user_id};
          const response = await axios.post('http://134.209.250.123:8000/api/add-course/', formData, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
              }
          });
            console.log(response.data);
            setIsSubmitting(false);
        
        } catch (error) {
          console.error('Error adding course:', error);
          setIsSubmitting(false);
        }
        reset();
      };

  return (
    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header_inner}>
                    <div className={styles.burgerSide}>
                        <img src={burgerImg} alt="burger" />
                        <h2>Мои курсы</h2>
                    </div>

                        <div onClick={handleDropdownClick} className={styles.users_profile}>
                        <div className={styles.users_profile_info}>
                        <div className={styles.users_name_role}>
                            <div className={styles.users_name_surname}>
                            <div className={styles.users_name}>{user.first_name}</div>
                            <div>{user.last_name}</div>
                            </div>
                            <div className={styles.users_role}>{user.role}</div>
                        </div> 
                
                        <img style={{ transform: isRotated ? 'rotate(180deg)' : 'none' }} src={line2}/>
                        </div>

                        {isActiveDropdown && 
                        <ul>
                        <li>
                            <Link to='/profile'>Мой профиль</Link>
                        </li>
                        <li>
                            <Link to='/edit-profile'>Редактировать </Link>
                        </li>
                        <li>
                            <Link to='/logout'>Выйти</Link>
                        </li>
                        </ul>}
                    </div>
                </div>

                {/* ADD COURSE CONTENT */}
                <div className={styles.add_course_content}>
                    <h2 className={styles.add_course_title}>Добавить курс</h2>

                    <div className={styles.add_course_form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.group}>
                            <label  htmlFor='name'>
                            Название курса
                            </label>
                            <br/>
                            <input
                            type="text"
                            placeholder='Название вашего курса'
                            id='name'
                            {...register("name", { required: true })}
                            />
                            <div>{errors?.name && <p className={styles['error-text']}>Пожалуйста, заполните это поле</p>}</div>

                        </div>

                        <div className={styles.group}>
                            <label htmlFor='description'>
                            Описания курсов
                            </label>
                            <br/>
                            <input
                            className={styles.course_desc}
                            type="text"
                            placeholder='Введите описание вашего курса  '
                            id='description'
                            {...register("description", { required: true })}
                            />
                            <div>{errors?.description && <p className={styles['error-text']}>Пожалуйста, заполните это поле</p>}</div>

                        </div>

                        <div className={styles.group}>
                            <label htmlFor='category_id'>
                            Категория курса
                            </label>
                                    
                            <select className={styles.course_categories}
                            {...register("category_id", { required: true })}>
                                <option disabled selected value="">Выбирать...</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <div>{errors?.category_id && <p className={styles['error-text']}>Выберите категорию!</p>}</div>
                        </div>

                        <div className={styles.column}>
                            <div className={styles.group}>
                                <label htmlFor='level'>
                                Уровень курса
                                </label>
                                        
                                <select className={styles.course_categories}
                                {...register("level", { required: true})}>
                                    <option disabled selected value="">Выбирать...</option>
                                    <option value="Легкий">Легкий</option>
                                    <option value="Средний">Средний</option>
                                    <option value="Сложный">Сложный</option>
                                </select>
                                <div>{errors?.level && <p className={styles['error-text']}>Выберите уровень!</p>}</div>
                            </div>

                            <div className={styles.group}>
                                <label htmlFor='language'>
                                Язык курса
                                </label>
                                        
                                <select className={styles.course_categories}
                                {...register("language", { required: true})}>
                                    <option disabled selected value="">Выбирать...</option>
                                    <option value="Казахский">Казахский</option>
                                    <option value="Русский">Русский</option>
                                    <option value="Английсий">Английский</option>
                                </select>
                                <div>{errors?.language && <p className={styles['error-text']}>Выберите язык!</p>}</div>
                            </div>

                            <div className={styles.group}>
                                <label htmlFor='cost'>
                                Цена
                                </label>
                                <br/>
                                <input
                                type="number"
                                placeholder='Цена вашего курса'
                                id='cost'
                                {...register("cost" , { required: true})} />
                                <div>{errors?.cost && <p className={styles['error-text']}>Укажите цену данного курса!</p>}</div>

                                </div>
                        </div>

                        <div className={styles.add_course_buttons}>
                            <Link to='/my-courses'><button  className={styles.cancel}>Отменить</button></Link>
                            <button  className={styles.saveCourse_btn} disabled={isSubmitting}>Сохранить</button>
                        </div>
                        </form>
                    </div>
                </div>
                 
            </div>
            <Footer/>
        </div>
                  
        </div>
        
    </div>
  )
}

export default AddCourse;
