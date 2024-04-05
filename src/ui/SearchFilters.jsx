import React, { useState } from 'react';
import styles from '../styles/SearchFilters.module.css';
import searchButton from '../images/serach.svg';
import categories from '../components/courseCategories';

const SearchFilters = ({onSearchResults}) => {
    const [course, setCourse] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    const [minCostInputValue, setMinCostInputValue] = useState('');
    const [maxCostInputValue, setMaxCostInputValue] = useState('');
    const [results, setResults] = useState([]);
    const handleFilter = () => {
        // Формируем объект с данными для запроса
        const requestData = {
            course,
            category,
            level,
            min_cost: minCostInputValue,
            max_cost: maxCostInputValue
        };
    
        let apiUrl = 'http://134.209.250.123:8000/api/search-and-filter/';

        // Отправляем запрос на сервер с выбранными значениями
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Преобразуем ответ в объект JSON
        })
        .then(data => {
            // После получения ответа с курсами, устанавливаем результаты фильтрации
            onSearchResults(data);
            console.log(data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        };
    
    return (
        <div className={styles['input-wrapper']}>
            <input className={styles.search_input} 
            type="text"
            placeholder='Чему хотите научиться?'
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            />
            <select className={styles.dropdown}
            value={category}
            onChange={(e) => setCategory(e.target.value)} >
                <option value="">Категория</option>
                {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <select className={styles.dropdown}
            value={level}
            onChange={(e) => setLevel(e.target.value)} >
                <option value="">Уровень</option>
                <option value="Легкий">Легкий</option>
                <option value="Средний">Средний</option>
                <option value="Сложный">Сложный</option>
            </select>
            <input className={styles.min_cost_input} 
            type="text"
            value={minCostInputValue}
            onChange={(e) => setMinCostInputValue(e.target.value)}
            placeholder='Мин цена'
            />
            <input className={styles.max_cost_input} 
            type="text"
            placeholder='Макс цена'
            value={maxCostInputValue}
            onChange={(e) => setMaxCostInputValue(e.target.value)}
            />
            <button className={styles.searchBtn} onClick={handleFilter}>Поиск</button>
        </div>
    );
};

export default SearchFilters;
