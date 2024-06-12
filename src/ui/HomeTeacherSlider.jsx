import React, {useState, useEffect} from 'react';
import tutor1 from '../images/tutor1.svg';
import tutor2 from '../images/tutor2.svg';
import tutor3 from '../images/tutor3.svg';
import tutor4 from '../images/tutor4.svg';
import styles from '../styles/HomeTeacherSlider.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import def from '../images/defaultProfImg.jpg'

const HomeTeacherSlider = () => {
  const [topTeachers, setTopTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://genuis.tech/api/top-teacher/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
  
        const teachers = response.data;
        setTopTeachers(teachers)
        console.log(teachers)
      } catch (error) {
        console.error('Error fetching courses:', error);
        
      }
    };
  
    fetchTeachers();
  }, []); 
  
    var settings = {
        dots: true,
        infinite: true ,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

  return (
    <div className={styles.slider}>
        <div className={styles.slider_inner}>
            <Slider {...settings}>
                {topTeachers.map((d,index) =>(
                    <div key={index} className={styles.slider_item}>
                         <div className={styles.slider_item_img}>
                         <img className={styles.profilePic} src={d.profile_picture ? `https://genuis.tech${d.profile_picture}` : def} alt="prof" />
                        </div>
                        
                        <div className={styles.slider_item_info}>
                            <p className={styles.slider_item_name}>{d.first_name} {d.last_name}</p>
                            <p className={styles.slider_item_position}>{d.course_name}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    </div>
  )
}


export default HomeTeacherSlider;