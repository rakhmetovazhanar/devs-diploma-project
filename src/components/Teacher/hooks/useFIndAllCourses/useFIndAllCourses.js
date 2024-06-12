import { useEffect, useState } from 'react';
import axios from 'axios';

export function useFIndAllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://134.209.250.123:8000/api/get-teacher-courses/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });

        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetch().then();
  }, []);

  return courses;
}