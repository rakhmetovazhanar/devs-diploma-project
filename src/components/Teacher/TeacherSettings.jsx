import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/TeacherSettings.module.css';
import TeacherHeader from './TeacherHeader';
import SettingsProfileTeacher from './SettingsProfileTeacher';
import SettingsEditTeacher from './SettingsEditTeacher';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../components/UserContext';
import HelpPage from '../HelpPage';
import Footer from '../../ui/Footer';

const TeacherSettings = () => {
  const {user, setUser} = useContext(UserContext);
  const [selectedComponent, setSelectedComponent] = useState('profile'); 
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');
  const history = useNavigate();
  const [userDataChanged, setUserDataChanged] = useState(false);
  const [userImgChanged, setUserImgChanged] = useState(false);

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    city: '',
    age:'',
    username: '',
    phone_number:'',
    experience:'',
    bio: '',
    profile_picture: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://134.209.250.123:8000/api/teacher-profile/${user.user_id}`,{
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



  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setProfileImage(imageFile);
      setUserData(prevUserData => ({
        ...prevUserData,
        profile_picture: URL.createObjectURL(imageFile) // Создаем URL-адрес изображения
      }));
    }
    setUserImgChanged(true);
  };

  

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
    }
    setUserDataChanged(true);
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
      formData.append('experience', userData.experience);
      formData.append('bio', userData.bio);

      const response = await axios.put(`https://134.209.250.123:8000/api/update-teacher-profile/${user.user_id}`, formData,{
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        } 
      }); 
      if(response.status === 200){
        // console.log(formData)
        console.log('Successfully updated!');
        const updatedUserData = await axios.get(`https://134.209.250.123:8000/api/teacher-profile/${user.user_id}`, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setUserData(updatedUserData.data);
      setIsSubmitting(false);
      setSelectedComponent('profile');
      }else{
        console.log('Not updated');
        setIsSubmitting(false);
      }
    
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error updating user:', error);
    }
  
  };

  useEffect(() => {
    if (isSubmitting) {
      setSelectedComponent('profile'); // Устанавливаем выбранный компонент в 'profile' при isSubmitting === true
    }
  }, [isSubmitting]);

  const handleDeleteImage = async () => {
    try {
      const response = await axios.delete(`https://134.209.250.123:8000/api/delete-picture/${user.user_id}`, {
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



  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };
  return (
    <div className={styles.wrapper}>
        <div className={styles.wrap_inner}>
            <div className={styles.header}>
                <div className={styles.container}>
                        <TeacherHeader headerTitle={'Настройки'}/>
                        <div className={styles.settings_content}>
                            <div className={styles.settings_parts}>
                                <h3 className={selectedComponent === 'profile' ? styles.active : ''} onClick={() => handleComponentChange('profile')}>Мой профиль</h3>
                                <h3 className={selectedComponent === 'edit' ? styles.active : ''} onClick={() => handleComponentChange('edit')}>Редактировать</h3>
                                <h3 className={selectedComponent === 'help' ? styles.active : ''} onClick={() => handleComponentChange('help')}>Связаться с нами</h3>
                            </div>
                            <span className={styles.line}></span>
                            {selectedComponent === 'profile' && <SettingsProfileTeacher />}
                            {selectedComponent === 'edit' && <SettingsEditTeacher userData={userData}
                            handleChange={handleChange}
                            handleExperienceChange={handleExperienceChange}
                            handleImageChange={handleImageChange}
                            handleDeleteImage={handleDeleteImage}
                            handleSubmit={handleSubmit}
                            isSubmitting={isSubmitting} />}
                            {selectedComponent === 'help' && <HelpPage />}
                                            
                        </div>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default TeacherSettings;
