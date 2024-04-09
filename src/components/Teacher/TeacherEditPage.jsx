import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/TeacherEditPage.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../components/UserContext';
import Footer from '../../ui/Footer';
import axios from 'axios';
import TeacherHeader from './TeacherHeader';
import Logo from '../../ui/Logo';
import profileImg from '../../images/studentsImg.svg';



const TeacherEditPage = () => {
  const {user, setUser} = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');
  const history = useNavigate();

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    city: '',
    age:'',
    username: '',
    phone_number:'',
    experience:'',
    bio: '',
    profile_picture: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://134.209.250.123:8000/api/teacher-profile/${user.user_id}`,{
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }); 
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [user.user_id]);
  

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setUserData({
        ...userData,
        [name]: value
      });
    } else {
      setUserData({
        ...userData,
        [name]: value
      });
    }};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserData(prevUserData => ({
      ...prevUserData,
      profile_picture: file
    }));
  };
  
  const handleRemoveImage = () => {
    setUserData({
      ...userData,
      profile_picture: null
    });
  };


const handleExperienceChange = (e) => {
  const { value } = e.target;
  setUserData(prevUserData => ({
    ...prevUserData,
    experience: value
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.put(`http://134.209.250.123:8000/api/update-teacher-profile/${user.user_id}`, userData,{
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        } 
      }); 
      if(response.status === 200){
        console.log('Successfully updated!');
        history('/teacher-profile')
      }else{
        console.log('Not updated');
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
                <TeacherHeader headerTitle={`Привет ${user.first_name}`}/>    
                <div className={styles.edit_profile}>
                    <h2 className={styles.edit_profile_title}>Редактировать профиль</h2>
                    <div className={styles.edit_profile_inner}>
                        <div className={styles.edit_profile_info}>
                            <div className={styles.edit_form}>
                                <form onSubmit={handleSubmit} className={styles.general_form} encType='multipart/form-data'>
                                        <div>
                                          {userData && userData.profile_picture ? (
                                            <>
                                              <img className={styles.user_img} src={userData.profile_picture} alt="profile" />
                                              <button className={styles.delete_profile_picture} type='button' onClick={handleRemoveImage}>Удалить</button>
                                            </>
                                          ) : (
                                            <>
                                              <img className={styles.user_img} src={profileImg} alt="Default Profile" />
                                              <input type="file" name='profile_picture' onChange={handleImageChange} accept="image/*" />
                                            </>
                                          )}
                                        </div>
                                        <div className={styles.edit_profile_form}>
                                        <div className={styles.column}>
                                            <div className={styles.group}>
                                                <label htmlFor='first_name'>
                                                Имя
                                                </label>
                                                <input className={styles.edit_input}
                                                name="first_name"
                                                onChange={handleChange}
                                                value={userData.first_name}
                                                type="text"
                                                autoComplete='off'
                                                id='first_name' />
                                            </div>

                                            <div className={styles.group}>
                                                <label htmlFor='last_name'>
                                                Фамилия
                                                </label>
                                                <input className={styles.edit_input}
                                                name='last_name'
                                                onChange={handleChange}
                                                value={userData.last_name}
                                                type="text"
                                                id='last_name' />
                                            </div>
                                        </div>

                                        <div style={{height: '133px'}} className={styles.group}>
                                                <label htmlFor='bio'>
                                                О себе
                                                </label>
                                                <input style={{height: '114px'}} className={styles.edit_input}
                                                name="bio"
                                                value={userData.bio}
                                                onChange={handleChange}
                                                type="text"
                                                id='bio' />
                                        </div>  

                                        <div className={styles.column}>
                                            <div className={styles.group}>
                                                <label htmlFor='city'>
                                                Ваш город
                                                </label>
                                                <input className={styles.edit_input}
                                                name="city"
                                                onChange={handleChange}
                                                value={userData.city}
                                                type="text"
                                                autoComplete='off'
                                                id='city' />
                                            </div>

                                            <div className={styles.group}>
                                                <label htmlFor='age'>
                                                Ваш возраст
                                                </label>
                                                <input className={styles.edit_input}
                                                name="age"
                                                onChange={handleChange}
                                                value={userData.age}
                                                type="text"
                                                id='age' />
                                            </div>

                                            
                                        </div>
                                        <div className={styles.group}>
                                            <label htmlFor='experience'>
                                            *Каков ваш опыт работы?
                                            </label>
                                            <div className={styles.expGroup}>
                                            <div className={styles.expNo}>
                                                <input 
                                                name="experience"
                                                type="radio"
                                                value='Нет опыта'
                                                checked={userData.experience === 'Нет опыта'}
                                                onChange={handleExperienceChange} 
                                                />
                                                <p>Нет опыта</p>
                                            </div>

                                            <div className={styles.expOneToThree}>
                                                <input 
                                                name="experience"
                                                type="radio"
                                                value='До 3 лет'
                                                checked={userData.experience === 'До 3 лет'}
                                                onChange={handleExperienceChange} 
                                                />
                                                <p>До 3 лет</p>
                                            </div>

                                            <div className={styles.expThreeToFive}>
                                                <input 
                                                name="experience"
                                                type="radio"
                                                value='От 3 до 5 лет'
                                                checked={userData.experience === 'От 3 до 5 лет'}
                                                onChange={handleExperienceChange} 
                                                />
                                                <p>От 3 до 5 лет</p>
                                            </div>

                                            <div className={styles.expMore}>
                                                <input 
                                                name="experience"
                                                type="radio"
                                                value='Больше'
                                                checked={userData.experience === 'Больше'}
                                                onChange={handleExperienceChange} 
                                                />
                                                <p>Больше</p>
                                            </div>
                                            </div>

                                        </div>

                                        <div className={styles.column}>
                                            <div className={styles.group}>
                                                <label htmlFor='username'>
                                                Ваш адрес электронной почты
                                                </label>
                                                <input className={styles.edit_input}
                                                name="username"
                                                onChange={handleChange}
                                                value={userData.username}
                                                type="text"
                                                autoComplete='off'
                                                id='username' />
                                            </div>

                                            <div className={styles.group}>
                                                <label htmlFor='phone_number'>
                                                Ваш номер телефона
                                                </label>
                                                <input className={styles.edit_input}
                                                name="phone_number"
                                                onChange={handleChange}
                                                value={userData.phone_number}
                                                type="text"
                                                id='phone_number' />
                                            </div>
                                        </div>

                                        <div className={styles.edit_profile_btns}>
                                            <Link to='/teacher-profile'><button  className={styles.cancel}>Отменить</button></Link>
                                            <button className={styles.editBtn} disabled={isSubmitting}>Сохранить</button>
                                        </div>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        </div>
    </div>
  )
}

export default TeacherEditPage;
