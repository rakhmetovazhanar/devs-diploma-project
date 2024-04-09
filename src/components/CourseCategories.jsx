import React, {useState} from 'react';
import CategoryItem from '../ui/CourseItem';
import graphicImg from '../images/graphic.svg';
import databaseImg from '../images/databaseImg.svg';
import financeImg from '../images/financeImg.jpg';
import spainImg from '../images/spain.svg';
import progImg from '../images/progLanguages.svg';
import webDevImg from '../images/webDevImg.svg';
import mathImg from '../images/mathImg.svg';
import networkImg from '../images/networkImg.jpeg';
import linuxImg from '../images/linuxImg.png';
import funcImg from '../images/funcImg.png';
import gameImg from '../images/gameImg.jpeg';
import mobileImg from '../images/mobileImg.jpeg';
import styles from '../styles/CourseCategories.module.css';
import {useNavigate, Link} from 'react-router-dom';


const rusCategories = [
    { id: 1, name: "Языки программирования", desc: "Научим писать код, создавать программы. Онлайн и оффлайн занятия. Поддержка менторов.",img: progImg },
    { id: 2, name: "Управление базами данных" , desc: "Комплекс программно-языковых средств, позволяющих создать базы данных и управлять данными", img:databaseImg },
    { id: 3, name: "Графический дизайн и мультимедиа" , desc: "Создают и комбинируют символы, изображения и текст для формирования визуальных представлений идей и сообщений", img: graphicImg},
    { id: 4, name: "Финансы и экономика" , desc: "Мастерство в финансах и экономике: стратегии для максимизации прибыли", img : financeImg},
    { id: 5, name: "Сеть и безопасность", desc: "Программа включает аспекты кибербезопасности, сетевой архитектуры, угрозы и меры защиты." , img:networkImg },
    { id: 6, name: "Математика и статистика" , desc: "Уроки математики, основы программирования,  математический тренажер, игровое обучение.", img: mathImg},
    { id: 7, name: "Веб-разработка", desc: "Создание веб-сайтов, объединяющих визуальную привлекательность с максимизацией прибыли.", img: webDevImg },
    { id: 8, name: "Сценарии оболочки и Linux",desc: "Основы сценариев оболочки и управление Linux для эффективного администрирования." , img:linuxImg },
    { id: 9, name: "Функциональное программирование",desc: "Изучение принципов, основ и практических навыков функционального программирования." , img:funcImg },
    { id: 10, name: "Разработка игр" ,desc: "Разработка игр: от концепции до воплощения с использованием современных технологий." , img:gameImg },
    { id: 11, name: "История и обществознание" ,desc: "Cпециально разработанная система, состоящая из совокупности занятий по проработке всех языковых навыков." ,img:spainImg },
    { id: 12, name: "Разработка мобильных приложений",desc: "Изучение технологий и методов разработки мобильных приложений для iOS и Android платформ." ,img:mobileImg },
]
const CourseCategories = () => {
  const [showMore, setShowMore] = useState(false);
  const [showLess, setShowLess] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
    setShowLess(false);
  };

  const handleShowLess = () => {
    setShowMore(false);
    setShowLess(false);
  };

 
  return (
    
    <section id='courses' className={styles.courses}>
        <h3>Выберите любимый курс из высшей категории</h3>
        <div className={styles.courseItems}>
        {rusCategories.slice(0, 6).map((category) => (
            <Link key={category.id} to={`/courses-by-category/${category.id}/${encodeURIComponent(category.name)}`}>
            <CategoryItem
            key={category.id}
            img={category.img}
            name={category.name}
            desc={category.desc}
          />
          </Link>
        ))}
        {!showMore && !showLess && (
          <button className={styles.showMore} onClick={handleShowMore}>Показать больше</button>
        )}
        {showMore && rusCategories.slice(6).map((category) => (
          <Link key={category.id} to={`/courses-by-category/${category.id}/${encodeURIComponent(category.name)}`}>
            <CategoryItem
              key={category.id}
              img={category.img}
              name={category.name}
              desc={category.desc}
            />
          </Link>
        ))}
        {showMore && (
          <button className={styles.showLess} onClick={handleShowLess}>Свернуть</button>
        )}
        </div>
    </section>
  )
}

export default CourseCategories;
