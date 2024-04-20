import styles from '../styles/MyCourses.module.css';
import Footer from '../ui/Footer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loading = ({ loading, children }) => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.wrap_inner}>
          <div className={styles.header}>
            <div className={styles.container}>
              {loading ? ( // Если идет загрузка, отображаем анимацию загрузки
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                  <CircularProgress />
                </Box>
              ) : ( // Если загрузка завершена, отображаем дочерние компоненты
                <div>{children}</div>
              )}
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    );
  }

  export default Loading;
  