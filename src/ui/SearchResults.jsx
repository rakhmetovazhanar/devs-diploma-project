import React from 'react';
import styles from '../styles/Home.module.css';

const SearchResults = ({ results }) => {
  return (
    <div className={styles['results-list']}>
        {
            results.map((result, id) =>{
                return <div className={styles.searchResults} onClick={(e) => alert(`You clicked on ${result}`)} key={id}>{result.name}</div>
            })
        }
    </div>
  )
}

export default SearchResults;
