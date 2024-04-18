import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/TeacherEditPage.module.css';
import {Link, useNavigate} from 'react-router-dom';
import profileImg from '../../images/studentsImg.svg';


const SettingsEditTeacher = ({
  userData,
  handleChange,
  handleExperienceChange,
  handleImageChange,
  handleDeleteImage,
  handleSubmit,
  isSubmitting
}) => {
  return (
    <div className={styles.edit_wrap}>
    <div className={styles.edit_profile_info}>
    <div className={styles.edit_form}>
        <form onSubmit={handleSubmit} className={styles.general_form} >
        <div>
        {userData.profile_picture ? (
             <div>
            {/* <img className={styles.user_img} src={`http://134.209.250.123:8000${userData.profile_picture}`} alt="hello" /> */}
            <img className={styles.user_img} src={userData.profile_picture} alt="Profile" />
            <button onClick={handleDeleteImage} className={styles.delete_profile_picture}>Удалить</button>
            </div>
        ) : (
            <>   
            <img className={styles.user_img} src={profileImg} alt="hello" />                         
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
                    <button className={styles.editBtn} disabled={isSubmitting}>Сохранить</button>
                </div>
                </div>
        </form>
    </div>
</div>
</div>
  )
}


export default SettingsEditTeacher;