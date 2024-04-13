import React , {useState, useContext, useEffect} from 'react';
import styles from '../../styles/MyClients.module.css';
import TeacherHeader from './TeacherHeader';
import { UserContext } from '../UserContext';
import axios from 'axios';
import randomPhotos from '../../ui/randomPhotos';
import {Link} from 'react-router-dom';
// import { CircleLoader } from "react-awesome-loaders";

const MyClients = () => {
  const [courses, setCourses] = useState([]);
  const {user} = useContext(UserContext);
  const [randomPhotoIndexes, setRandomPhotoIndexes] = useState([]);

  useEffect(() => {
    const generateRandomIndexes = () => {
      const indexes = [];
      for (let i = 0; i < courses.length; i++) {
        const index = Math.floor(Math.random() * randomPhotos.length);
        indexes.push(index);
      }
      return indexes;
    };
  
    const randomIndexes = generateRandomIndexes();
    setRandomPhotoIndexes(randomIndexes);
  }, [courses]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://134.209.250.123:8000/api/get-teacher-courses/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const sortedCourses = response.data.slice().reverse();
        setCourses(sortedCourses)
        
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []); 

  
  return (
    <div className={styles.wrapper}>
        <div className={styles.wrap_inner}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <TeacherHeader headerTitle={`Привет ${user.first_name}`}/>
                    <div className={styles.my_clients}>
                        <h2 className={styles.my_clients_title}>Мои клиенты</h2>
                        <div className={styles.courses}>
                        {/* <CircleLoader
                            meshColor={"#6366F1"}
                            lightColor={"#E0E7FF"}
                            duration={1.5}
                            desktopSize={"90px"}
                            mobileSize={"64px"}
                        /> */}
                            {courses.map((course,index)=>(
                                 <div className={styles.course} key={course.id}>
                                    <Link to={`/teacher-course-clients/${course.id}`}>
                                        <img src={randomPhotos[randomPhotoIndexes[index]]} alt="course" />
                                        <h3 className={styles.course_name}>{course.name}</h3>
                                    </Link>
                             </div>
                            ))}                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyClients;
