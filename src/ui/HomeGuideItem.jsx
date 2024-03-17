import React from 'react';
import guide1 from '../images/guide1.svg';
import guide2 from '../images/guide2.svg';
import guide3 from '../images/guide3.svg';
import styles from '../styles/Home.module.css';

const HomeGuideItem = () => {
  return (
    <div className={styles.guide}>
        <div className={styles.guide_item}>
            <img src={guide1}  />
            <h4>Поиск</h4>
            <p>Выберите подходящего репетитора из более чем 110,000+ репетиторов со <br/> всего Казахстана</p>
        </div>

        <div className={styles.guide_item}>
            <img src={guide2}/>
            <h4>Форма заявки</h4>
            <p>Заполните форму заявки, и <br/>преподавателю будет отправлено <br/>сообщение.</p>
        </div>

        <div className={styles.guide_item}>
            <img src={guide3} />
            <h4>Обучение</h4>
            <p>Вскоре с вами свяжется <br/> преподаватель, и вы сможете <br/> приступить к занятиям.</p>
        </div>
    </div>
  )
}

export default HomeGuideItem;
