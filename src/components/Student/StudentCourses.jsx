// import React from 'react';
// import styles from '../../styles/StudentCourses.module.css';

// const StudentCourses = () => {
//   return (
//     <div className={styles.wrapper}>
//     <div className={styles.wrap_inner}>
//         <div className={styles.header}>
//             <div className={styles.container}>
//                 <TeacherHeader headerTitle={'Мои курсы'}/>
//                   {/* MAIN CONTENT */}
//                 <div className={styles.main_content}>
//                   <div className={styles.my_courses_actions}>
//                     <Link to='/add-course'><button className={styles.to_add_course_btn}>Добавить курс</button></Link>
//                   </div>
//                 </div>
//                 {/* COURSE LIST */}
//                 <div className={styles.my_courses_list}>
//                 {courses.length === 0 ? (
//                   <h3 className={styles.no_courses}>У вас пока нет курсов</h3>
//                 ) : (
//                   courses.filter(course => course.name.toLowerCase().includes(searchText.toLowerCase())).map((course) => (
//                     <CourseItem key={course.id} course={course} handleDelete={handleDelete} />
//                   ))
//                 )}
//                 </div>
//             </div>
//             <Footer/>
//         </div>
                  
//         </div>
        
//     </div>
//   )
// }

// export default StudentCourses;
