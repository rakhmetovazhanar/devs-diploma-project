import React from 'react'
import styles from '../styles/Home.module.css';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <button><Link to='/login'>Login</Link></button>
            <button><Link to='/student-register'>Registration for student</Link></button>
            <button><Link to='/instructor-register'>Registration for instrucor</Link></button>
        </div>
    </div>
  )
}

export default Home;
