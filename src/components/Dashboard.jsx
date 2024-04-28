import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios'; 
import { UserContext } from './UserContext';
import TeacherHeader from './Teacher/TeacherHeader';
import StudentHeader from './Student/StudentHeader';
import styles from '../styles/Dashboard.module.css';
import NotLoginHeader from './NotLoginHeader';
import Footer from '../ui/Footer';
import Logo from '../ui/Logo';
import logoPhoto from '../images/Logo-blue.png';

const Dashboard = () => {
  const {user} = useContext(UserContext);
  const [d1, setD1] = useState(null);
  const [d2, setD2] = useState(null);
  const [d3, setD3] = useState(null);
  const [d4, setD4] = useState(null);
  const [d5, setD5] = useState(null);
  const [d6, setD6] = useState(null);
  const [dashboards, setDashboards] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const urls = {
              d1: 'http://134.209.250.123:8000/api/top-courses-dashboard/',
              d2: 'http://134.209.250.123:8000/api/student-dashboard/',
              d3: 'http://134.209.250.123:8000/api/users-number-dashboard/',
              d4: 'http://134.209.250.123:8000/api/age-dashboard/',
              d5: 'http://134.209.250.123:8000/api/experience-dashboard/',
              d6: 'http://134.209.250.123:8000/api/city-dashboard/'
            };
    
            for (const key of Object.keys(urls)) {
              try {
                const response = await axios.get(urls[key]);
                const blob = new Blob([response.data], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                setDashboards(prevState => ({ ...prevState, [key]: url }));
              } catch (error) {
                console.error(`Error fetching data for ${key}:`, error);
                setDashboards(prevState => ({ ...prevState, [key]: null }));
              }
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    
        return () => {
          Object.values(dashboards).forEach(url => {
            if (url) {
              URL.revokeObjectURL(url);
            }
          });
        };
      }, []);


  return (
    <div className={styles.wrapper}>
        <div className={styles.wrap_inner}>
            <div className={styles.header}>
                <div className={styles.container}>
                {user.role === 'Репетитор' ? (
                    <TeacherHeader />
                ): (
                    <StudentHeader />
                )}
                <img className={styles.logoPhoto} src={logoPhoto} alt="" />
                <div className={styles.dashboard_content}>
                    <h2>Дашборд</h2>

                    <div className={styles.inner_dashboard}>

                {Object.keys(dashboards).map(key => (
                <div key={key}>
                    {dashboards[key] ? (
                    <img className={styles.dash1} src={dashboards[key]} alt={`Dashboard ${key}`} />
                    ) : (
                    <p>Данные для дашборда {key} недоступны</p>
                    )}
                </div>
                ))}
                    </div>
                </div>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard;