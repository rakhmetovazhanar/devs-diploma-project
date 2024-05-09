import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/StudentEditPage.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../components/UserContext';
import Footer from '../../ui/Footer';
import axios from 'axios';
import StudentHeader from './StudentHeader';
import profileImg from '../../images/studentsImg.svg';
import def from '../../images/defaultProfImg.jpg';

const StudentEditPage = () => {
  const {user} = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');
  const history=useNavigate();
  const [profileImage, setProfileImage] = useState(null);


  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    city: '',
    age:'',
    username: '',
    phone_number:'',
    profile_picture: '',

  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`http://134.209.250.123:8000/api/student-profile/${user.user_id}`,{
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
  const imageFile = e.target.files[0];
  if (imageFile) {
    setProfileImage(imageFile);
    setUserData(prevUserData => ({
      ...prevUserData,
      profile_picture: URL.createObjectURL(imageFile) // Создаем URL-адрес изображения
    }));
  }
};
    
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    try {
        const formData = new FormData();
        if (profileImage) {
          formData.append('profile_picture', profileImage);
        } 
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
        formData.append('city', userData.city);
        formData.append('age', userData.age);
        formData.append('username', userData.username);
        formData.append('phone_number', userData.phone_number);

        const response = await axios.put(`http://134.209.250.123:8000/api/update-student-profile/${user.user_id}`, formData,{
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data'
        }
        }); 
        if(response.status ===200){
          console.log('Successfully updated!');
          setUserData(prevUserData => ({
            ...prevUserData,
            profile_picture: decodeURIComponent(response.data.profile_picture) // Предполагается, что API возвращает обновленные данные пользователя с новым URL изображения
          }));
          history('/student-profile')
        }else{
          console.log('wrong!')
        }
    } catch (error) {
        setIsSubmitting(false);
        console.error('Error updating user:', error);
    }
}

const handleDeleteImage = async () => {
  try {
    const response = await axios.delete(`http://134.209.250.123:8000/api/delete-picture/${user.user_id}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    if (response.status === 200) {
      console.log('Profile picture deleted successfully!');
      setProfileImage(null);
      setUserData(prevUserData => ({
        ...prevUserData,
        profile_picture: null
      }));
    } else {
      console.log('Failed to delete profile picture');
    }
  } catch (error) {
    console.error('Error deleting profile picture:', error);
  }
};

  return (
    <div className={styles.wrapper}>
    <div className={styles.wrap_inner}>
        <div className={styles.header}>
            <div className={styles.container}>
                <StudentHeader headerTitle={`Привет ${user.first_name}`}/>    
                <div className={styles.edit_profile}>
                    <h2 className={styles.edit_profile_title}>Редактировать профиль</h2>
                    <div className={styles.edit_profile_inner}>
                        <div className={styles.edit_profile_info}>
                            <div className={styles.edit_form}>
                                <form onSubmit={handleSubmit} className={styles.general_form}>
                                <div>
                                {userData.profile_picture ? (
                                  <div>
                                    {/* <img className={styles.user_img} src={userData.profile_picture} alt="hello" /> */}
                                    <img className={styles.user_img} src={decodeURIComponent(userData.profile_picture)} alt="Profile" />
                                    <button onClick={handleDeleteImage} className={styles.delete_profile_picture}>Удалить</button>
                                  </div>
                                ) : (
                                  <>   
                                  <img className={styles.user_img} src={def} alt="hello" />                         
                                      <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={styles.imageInput}
                                      />
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

                                        <div className={styles.column}>
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
                                            <Link to='/student-profile'><button  className={styles.cancel}>Отменить</button></Link>
                                            <button className={styles.editBtn} disabled={isSubmitting} >Сохранить</button>
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

export default StudentEditPage;
