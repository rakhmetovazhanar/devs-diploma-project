import React from 'react'
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <button>Login</button>
            <button>Sign up</button>
        </div>
    </div>
  )
}

export default Home;
