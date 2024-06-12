import React , {useState, useEffect}from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import feed1 from '../images/feed1.svg';
import feed2 from '../images/feed2.svg';
import feed3 from '../images/feed3.svg';
import styles from '../styles/HomeFeedbackSlider.module.css';
import stars from '../images/Star.svg';
import axios from 'axios';
import def from '../images/defaultProfImg.jpg'
import { MdOutlineStar } from "react-icons/md";


const colors = {
    orange: "#FD8E1F",
    grey: "#a9a9a9"
}

const HomeFeedbacksSlider = () => {
    const [data, setData] = useState([]);
    const stars = Array(5).fill(0);
    

    useEffect(() => {
        const fetchFeedbacks = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://134.209.250.123:8000/api/teacher-comments/', {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
      
            const feedbacks = response.data;
            setData(feedbacks)
          } catch (error) {
            console.error('Error fetching courses:', error);  
          }
        };
      
        fetchFeedbacks();
      }, []); 
      
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
  return (
    <div className={styles.feedback_slider}>
        <div className={styles.feedback_slider_inner}>
            <Slider {...settings}>
                {data.map((d,index) =>(
                    <div key={index} className={styles.feedback_slider_item}>
                        <div className={styles.feedback_slider_item_img}>
                        <img className={styles.profilePic} src={d.profile_picture ? `https://134.209.250.123:8000${d.profile_picture}` : def} alt="prof" />
                        </div>
                        
                        <div className={styles.feedback_slider_item_info}>
                            <p style={{color : 'rgba(45, 45, 45, 1)' , fontWeight: 'bold' , fontSize : '22px'}} className={styles.feedback_slider_item_name}>{d.first_name} {d.last_name}</p>
                            <p style={{fontSize : '14px', color : 'rgba(45, 45, 45, 1)', lineHeight: '16.8px'}} className={styles.feedback_slider_item_position}>{d.comment}</p>
                            {/* <img style={{marginTop: '60px', marginLeft: '-0px'}} className={styles.stars} src={stars} alt="stars" /> */}
                            <div className={styles.stars}>
                                {stars.map((_, index)=>{
                                return(
                                    <MdOutlineStar 
                                    key={index}
                                    size={23}
                                    color={d.rating > index ? colors.orange : colors.grey}/>
                                )
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    </div>
  )
}

export default HomeFeedbacksSlider;
