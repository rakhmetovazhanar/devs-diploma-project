import styles from '../../styles/LoginPage.module.css';
import logoBlue from '../../images/Logo-blue.png';

const Logo = () => {
    return (
        <div className={styles.logo}>
         <img src={logoBlue} alt="logoBlue" />
       </div>
    )
}
export default Logo