import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/EditCourse.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../components/UserContext';
import Footer from '../../ui/Footer';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import categories from '../courseCategories';
import TeacherHeader from './TeacherHeader';
import { useParams } from 'react-router-dom';




    const EditCourse = () => {
        const {courseId} =useParams();
        const [course, setCourse] = useState({
            name: '',
            description: '',
            category_id: '',
            day_time: '',
            level: '',
            language: '',
            cost: ''
        });
        const [loading, setLoading] = useState(true);
        const [isSubmitting, setIsSubmitting] = useState(false);
        const history = useNavigate();

        useEffect(() => {
            const fetchCourses = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get('https://134.209.250.123:8000/api/get-teacher-courses/', {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    if (response.data.length > 0) {
                        const courses = response.data;
                        const ids = courses.map(course=> course.id);
                        const courseIdNumber = parseInt(courseId, 10);
                        const courseToEdit = courses.find(course => course.id === courseIdNumber);
                        if (courseToEdit) {
                            setCourse(courseToEdit);
                            setLoading(false);
                        } else {
                            console.error('Course not found');
                            setLoading(false);
                        }
                    } else {
                        console.error('No course found');
                        setLoading(false);
                    }
                } catch (error) {
                    console.error('Error fetching courses:', error);
                    setLoading(false);
                }
            };
    
            fetchCourses();
        }, []);

        const handleEditCourse = async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.put(`https://134.209.250.123:8000/api/update-course/${course.id}`, course, {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
    
                if (response.status === 200) {
                    setIsSubmitting(false);
                    history('/my-courses');
                } else {
                    console.log('Something went wrong!');
                }
            } catch (error) {
                setIsSubmitting(false);
                console.error('Error editing course:', error);
            }
        };

    
    return (
        <div className={styles.wrapper}>
        <div className={styles.wrap_inner}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <TeacherHeader headerTitle={'Мои курсы'}/>
                    {/* ADD COURSE CONTENT */}
                    <div className={styles.add_course_content}>
                        <h2 className={styles.add_course_title}>Редактировать курс</h2>

                        <div className={styles.add_course_form}>
                            <form onSubmit={handleEditCourse}>
                            <div className={styles.group}>
                                <label  htmlFor='name'>
                                Название курса
                                </label>
                                <br/>
                                <input
                                type="text"
                                placeholder='Название вашего курса'
                                onChange={(e) => setCourse({...course, name: e.target.value})}
                                id='name'
                                value={course.name}
                                />

                            </div>

                            <div className={styles.group}>
                                <label htmlFor='description'>
                                Описания курсов
                                </label>
                                <br/>
                                <input
                                className={styles.course_desc}
                                onChange={(e) => setCourse({...course, description: e.target.value})}
                                type="text"
                                value={course.description}
                                placeholder='Введите описание вашего курса  '
                                id='description'
                                />

                            </div>

                            <div className={styles.column2}>
                                <div className={styles.group}>
                                    <label htmlFor='category_id'>
                                    Категория курса
                                    </label>
                                            
                                    <select className={styles.course_categories}
                                    value={course.category_id} // Установите текущее значение категории курса
                                    onChange={(e) => setCourse({...course, category_id: e.target.value})}>
                                        <option disabled  value="">Выбирать...</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.group}>
                                    <label  htmlFor='day_time'>
                                    Время для уроков
                                    </label>
                                    <br/>
                                    <input
                                    type="text"
                                    placeholder='Дата и время'
                                    value={course.day_time}
                                    onChange={(e) => setCourse({...course, day_time: e.target.value})}
                                    id='day_time'
                                    />

                                </div>
                            </div>
                            

                            <div className={styles.column}>
                                <div className={styles.group}>
                                    <label htmlFor='level'>
                                    Уровень курса
                                    </label>
                                            
                                    <select className={styles.course_categories}
                                    value={course.level} // Установите текущее значение языка курса
                                    onChange={(e) => setCourse({...course, level: e.target.value})}>
                                        <option disabled  value="">Выбирать...</option>
                                        <option value="Легкий">Легкий</option>
                                        <option value="Средний">Средний</option>
                                        <option value="Сложный">Сложный</option>
                                    </select>
                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='language'>
                                    Язык курса
                                    </label>
                                            
                                    <select className={styles.course_categories}
                                    value={course.language} // Установите текущее значение языка курса
                                    onChange={(e) => setCourse({...course, language: e.target.value})}>
                                        <option disabled selected value="">Выбирать...</option>
                                        <option value="Казахский">Казахский</option>
                                        <option value="Русский">Русский</option>
                                        <option value="Английский">Английский</option>
                                    </select>
                                </div>

                                <div className={styles.group}>
                                    <label htmlFor='cost'>
                                    Цена
                                    </label>
                                    <br/>
                                    <input
                                    type="number"
                                    value={course.cost}
                                    placeholder='Цена вашего курса'
                                    onChange={(e) => setCourse({...course, cost: e.target.value})}
                                    id='cost'
                                    />

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


export default EditCourse;
