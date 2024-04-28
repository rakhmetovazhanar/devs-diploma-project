import panel from '../../images/panel.svg';
import course from '../../images/course.svg';
import client from '../../images/clients.svg';
import schedule from '../../images/schedule.svg';
import settings from '../../images/settings.svg';
import mainPage from '../../images/mainPage.svg';


const SideBarData = [
    {
      title: 'Мои курсы',
      icon: course,
      link: '/my-courses',
    },
    {
      title: 'Мои клиенты',
      icon: client,
      link: '/teacher-clients',
    },
    {
      title: 'Главная страница',
      icon: mainPage,
      link: '/',
    },
    {
      title: 'Дашборд',
      icon: mainPage,
      link: '/dashboard',
    },
    {
      title: 'Настройки',
      icon: settings,
      link: '/teacher-settings',
    },
  ];
  
  export default SideBarData;
  