import React, { createContext, useState, useEffect, useContext } from 'react';

const CourseContext = createContext();

const CourseProvider = ({ children }) => {
    const [course, setCourse] = useState({
        id: null,
        name: '',
        description: '',
        cost: '',
        level:'',
        language:'',
        day_time:'',
        category_id:'',
    });

    const [courseIds,setCourseIds] =useState([]);
    useEffect(() => {
    }, [course, courseIds]);

    return (
        <CourseContext.Provider value={{ course, setCourse , courseIds, setCourseIds}}>
            {children}
        </CourseContext.Provider>
    );
};

const useCourseContext = () => {
    return useContext(CourseContext);
};

export { CourseProvider, useCourseContext, CourseContext };
