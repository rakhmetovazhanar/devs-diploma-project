import React , {useState} from 'react';
import styles from '../styles/StudentCourseItem.module.css';
import def from '../images/defaultProfImg.jpg';
import { MdOutlineStar } from "react-icons/md";

const colors = {
    orange: "#FD8E1F",
    grey: "#a9a9a9"
}
const CommentItem = ({comment}) => {
    const stars = Array(5).fill(0);
    const currentValueStar = comment.rating || 0;

  return (
    <div className={styles.commentItem}>
        {comment && (
        <div>
        <div className={styles.name_rating}>
            <div className={styles.name_photo}>
                <img src={comment.profile_picture ? `https://134.209.250.123:8000${comment.profile_picture}` : def} alt="prof" />
                <h4>{comment.first_name} {comment.last_name}</h4>
            </div>
            <div className={styles.stars}>
                {stars.map((_, index)=>{
                return(
                    <MdOutlineStar 
                    key={index}
                    size={28}
                    color={currentValueStar > index ? colors.orange : colors.grey}/>
                )
                })}
            </div>
        </div>

        <p className={styles.comment}>
            {comment.comment}
        </p>
        <p className={styles.date}>{comment.created}</p>
        </div>
        )}
    </div>
  )
}

export default CommentItem;
