import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/TeacherEditPage.module.css';
import {Link, useNavigate} from 'react-router-dom';
import profileImg from '../../images/studentsImg.svg';


const SettingsEditStudent = ({
  userData,
  handleChange,
  handleImageChange,
  handleDeleteImage,
  handleSubmit,
  isSubmitting
}) => {

  return (
    <div className={styles.edit_wrap}>
    <div className={styles.edit_profile_info}>
        <div className={styles.edit_form}>
            <form onSubmit={handleSubmit} className={styles.general_form}>
            <div>
            {userData.profile_picture ? (
                <div>
                {/* <img className={styles.user_img} src={`http://134.209.250.123:8000${userData.profile_picture}`} alt="hello" /> */}
                <img className={styles.user_img} src={decodeURIComponent(userData.profile_picture)} alt="Profile" />
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
                        <button className={styles.editBtn} disabled={isSubmitting} >Сохранить</button>
                    </div>
                    </div>
            </form>
        </div>
    </div>
</div>
  )
}


export default SettingsEditStudent;