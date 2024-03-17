import logoWhite from '../images/Logo-white.png';
import line from '../images/Line.png';
import line2 from '../images/Line2.png';
import styles from '../styles/RegisterStudent.module.css';
import React from 'react'
import {Link} from 'react-router-dom';
import facebook from '../images/facebook.svg';
import instagram from '../images/instagram.svg';
import youtube from '../images/youtube.svg';
import linkedin from '../images/linkedin.svg';



const Footer = () => {
  return (
        <footer className={styles.footer}>
        <div className={styles.startoffooter}>                   
                <img className={styles.logoWhite} src={logoWhite} alt="logoWhite" />
                <img className={styles.line} src={line} alt="line" />
                <h2 className={styles.zoom}>Virtual Class  Zoom</h2>
        </div>

        <div className={styles.subscribe}>
            <h3>Подпишитесь на нашу рассылку новостей</h3>

            <div className={styles.socials}>
                <Link className={styles.socialItem}><img src={facebook}/></Link>
                <Link className={styles.socialItem}><img src={instagram}/></Link>
                <Link className={styles.socialItem}><img src={linkedin}/></Link>
                <Link className={styles.socialItem}><img src={youtube}/></Link>
            </div>
        </div>

        <div className={styles.endoffooter}>
                <div className={styles.terms}>
                    <h4>Careers</h4>
                    <img src={line2} alt="line2" />
                    <h4>Privacy Policy</h4>
                    <img src={line2} alt="line2" />
                    <h4>Terms  &  Conditions</h4>
                    </div>

                <div className={styles.tech}>
                    <h4>© 2024 Class Technologies Inc.</h4>
                </div>
            </div>
        </footer>
  )
}

export default Footer;
