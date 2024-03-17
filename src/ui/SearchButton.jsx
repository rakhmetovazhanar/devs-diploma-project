import React , {useState} from 'react';
import searchButton from '../images/serach.svg';
import styles from '../styles/Home.module.css';

const SearchButton = ({setResults}) => {
    const [input , setInput] = useState("");
    const fetchData = (value) =>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json)=>{
            const results = json.filter((user) =>{
                return( value && user && user.name && user.name.toLowerCase().includes(value));
            });
            setResults(results);
        });
    }

    const handleChange = (value) =>{
        setInput(value);
        fetchData(value);
    }
    return (
        <div className={styles['input-wrapper']}>
            <input type="text" 
            placeholder='Что хотите научиться?' 
            value={input}
            onChange={(e)=> handleChange(e.target.value)} />
            <img src={searchButton} alt="search"/>
        </div>
    )
}


export default SearchButton;