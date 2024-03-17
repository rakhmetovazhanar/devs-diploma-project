// import styles from '../../styles/LoginPage.module.css';
import logoBlue from '../images/Logo-blue.png';

const Logo = (props) => {
    return (
        <div className={props.style}>
         <img src={logoBlue} alt="logoBlue" />
       </div>
    )
}
export default Logo