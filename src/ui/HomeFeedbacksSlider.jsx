import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import feed1 from '../images/feed1.svg';
import feed2 from '../images/feed2.svg';
import feed3 from '../images/feed3.svg';
import styles from '../styles/HomeFeedbackSlider.module.css';
import stars from '../images/Star.svg';



const data = [
    {
        img: feed1,
        name : `Артем Иса`,
        feedback : `С первого занятия очень понравился преподаватель, все объясняет понятно`
    },
    {
        img: feed2,
        name : `Арина Ахмет`,
        feedback : `Аселья тичер очень обоятельная, приятная в общении.`
    },
    {
        img: feed3,
        name : `Диас Мукан`,
        feedback : `Спасибо большое Ирине! Все доступно и понятно объяснила. Рекомендую`
    },

]
const HomeFeedbacksSlider = () => {
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
                {data.map((d) =>(
                    <div className={styles.feedback_slider_item}>
                        <div className={styles.feedback_slider_item_img}>
                            <img src={d.img} alt="usersPhoto" />
                        </div>
                        
                        <div className={styles.feedback_slider_item_info}>
                            <p style={{color : 'rgba(45, 45, 45, 1)' , fontWeight: 'bold' , fontSize : '22px'}} className={styles.feedback_slider_item_name}>{d.name}</p>
                            <p style={{fontSize : '14px', color : 'rgba(45, 45, 45, 1)', lineHeight: '16.8px'}} className={styles.feedback_slider_item_position}>{d.feedback}</p>
                            <img style={{marginTop: '60px', marginLeft: '-0px'}} className={styles.stars} src={stars} alt="stars" />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    </div>
  )
}

export default HomeFeedbacksSlider;
