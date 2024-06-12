import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/AddCourse.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../components/UserContext';
import Footer from '../../ui/Footer';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import categories from '../courseCategories';
import TeacherHeader from './TeacherHeader';
import { useCourseContext } from '../CourseContext';



const AddCourse = () => {
    const {user} = useContext(UserContext);
    const history = useNavigate();
    const [description, setDescription] = useState('');
    const maxLength = 250;

    const handleDescriptionChange = (e) => {
        const inputDescription = e.target.value;
        setDescription(inputDescription.slice(0, maxLength));
    }

    const characterCount = description.length;

    const form = useForm({
        mode: "onBlur",
    });
    const {register , handleSubmit, formState: { errors}, reset} = form;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const token = localStorage.getItem('token');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
          const formData = {...data, teacher_id: user.user_id};
          const response = await axios.post('https://genuis.tech/api/add-course/', formData, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'
              }
          });
          if(response.status===200 || response.status===201){
           
            setIsSubmitting(false);
            history('/my-courses')
          }else{
            console.log('wrong!')
          }
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
                <TeacherHeader headerTitle={'Мои курсы'}/>

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
                            onChange={handleDescriptionChange}
                            id='description'
                            {...register("description", { required: true })}
                            />
                            {/* <p>{description.length}/{maxLength}</p> */}
                            <div>{errors?.description && <p className={styles['error-text']}>Пожалуйста, заполните это поле</p>}</div>
                            

                        </div>

                        <div className={styles.column2}>
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

                            <div className={styles.group}>
                                <label  htmlFor='day_time'>
                                Время для уроков
                                </label>
                                <br/>
                                <input
                                type="text"
                                placeholder='Дата и время'
                                id='day_time'
                                {...register("day_time", { required: true })}
                                />
                                <div>{errors?.day_time && <p className={styles['error-text']}>Пожалуйста, заполните это поле</p>}</div>

                            </div>
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
                                    <option value="Английский">Английский</option>
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
