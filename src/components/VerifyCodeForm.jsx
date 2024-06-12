import React , {useState} from 'react'
import styles from '../styles/VerifyCodeForm.module.css';
import {Link} from 'react-router-dom';
import Logo from '../ui/Logo';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'


const VerifyCodeForm = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const { username } = location.state ? location.state : {}; 
    const navigate = useNavigate()
    const { token } = location.state ? location.state : ''; 

  
    const handleVerifyCode = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('https://genuis.tech/api/verify-code/', { code , username },{ headers: { Authorization: `Bearer ${token}` } });
        if(response) {
           let token = response.data.token
           navigate('/set-new-password', {state : {token}})
        }
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message);
      }
    };
  
    return (
        <div className={styles.wrap}>
        <div className={styles.container}>
            <Logo style={styles.logo} />
                <Link to='/login'><button className={styles.toLogin}>Войти</button></Link>

                <div className={styles.verifyCode}>
                    <div className={styles.verifyCode_inner}>
                        <h2>Проверка</h2>
                        <p>Введите свой 4-значный код, который вы получили по электронной почте.</p>
                        <form onSubmit={handleVerifyCode}>
                            <div className={styles['verify-code-container']}>
                                <input className={styles['verify-code-input']} value={code} maxLength={4} required onChange={(e)=> setCode(e.target.value)}/>
                                {/* <input className={styles['verify-code-input']} value={code} required onChange={(e)=> setCode(e.target.value)}/>
                                <input className={styles['verify-code-input']} value={code} required onChange={(e)=> setCode(e.target.value)}/>
                                <input className={styles['verify-code-input']} value={code} required onChange={(e)=> setCode(e.target.value)}/> */}
                            </div>

                            <button type='submit' className={styles.checkBtn}>Проверить</button>
                            <p>Если вы не получили код! <span>Повторно отправлять</span></p>
                            {message && <p>{message}</p>}
                        </form>
                    </div>
                </div>
            
        </div>
    </div>
    );
  };

  
export default VerifyCodeForm;