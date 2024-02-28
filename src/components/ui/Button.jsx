import {Link} from 'react-router-dom';

const Button  = ({url, text, style, access})=> {
    <Link className={style} to={access ? `/${url}` : '#'}>{text}</Link>
}
export default Button;