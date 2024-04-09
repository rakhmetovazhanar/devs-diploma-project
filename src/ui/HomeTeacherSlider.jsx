import React from 'react';
import tutor1 from '../images/tutor1.svg';
import tutor2 from '../images/tutor2.svg';
import tutor3 from '../images/tutor3.svg';
import tutor4 from '../images/tutor4.svg';
import styles from '../styles/HomeTeacherSlider.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
    {
        img: tutor1,
        name: `Арман Исаев`,
        position : `Frontend Developer`
    },
    {
        img: tutor2,
        name: `Аселья Мансурова`,
        position : `UI-UX Design Expart`
    },
    {
        img: tutor3,
        name: `Данияр Ахмет`,
        position : `Английский специалист`
    },
    {
        img: tutor4,
        name: `Кайрат Нуртас`,
        position : `Математика`
    }
    
]
const HomeTeacherSlider = () => {
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
                {data.map((d,index) =>(
                    <div key={index} className={styles.slider_item}>
                         <div className={styles.slider_item_img}>
                            <img src={d.img} alt="tutorPhoto" />
                        </div>
                        
                        <div className={styles.slider_item_info}>
                            <p className={styles.slider_item_name}>{d.name}</p>
                            <p className={styles.slider_item_position}>{d.position}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    </div>
  )
}


export default HomeTeacherSlider;