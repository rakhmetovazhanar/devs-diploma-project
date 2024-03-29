import React from 'react';
import {Routes , Route} from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import RegisterStudent from './RegisterStudent';
import RegisterInstructor from './RegisterInstructor';
import ForgotPassword from './ForgotPassword';
import LogoutPage from './LogoutPage';
import VerifyCodeForm from './VerifyCodeForm';
import SetNewPasswordForm from './SetNewPasswordForm';
import SuccessResetPassword from './SuccessResetPassword';
import MyCourses from '../components/Teacher/MyCourses';
import AddCourse from './Teacher/AddCourse';
import TeacherProfile from './Teacher/TeacherProfile';
import TeacherEditPage from './Teacher/TeacherEditPage';
import StudentProfile from './Student/StudentProfile';
import StudentEditPage from './Student/StudentEditPage';
import TeacherDeleteAccount from './Teacher/TeacherDeleteAccount';
import StudentDeleteAccount from './Student/StudentDeleteAccount';
import StudentCourses from './Student/StudentCourses';

const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/student-register' element={<RegisterStudent/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/instructor-register' element={<RegisterInstructor/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/logout' element={<LogoutPage/>}/>
            <Route path='/verify-code-form' element={<VerifyCodeForm/>}/>
            <Route path='/set-new-password' element={<SetNewPasswordForm/>}/>
            <Route path='/success-reset-password' element={<SuccessResetPassword/>}/>
            <Route path='/my-courses' element={<MyCourses/>}/>
            <Route path='/add-course' element={<AddCourse/>}/>
            <Route path='/teacher-profile' element={<TeacherProfile/>}/>
            <Route path='/teacher-edit-page' element={<TeacherEditPage/>}/>
            <Route path='/student-profile' element={<StudentProfile/>}/>
            <Route path='/student-edit-profile' element={<StudentEditPage/>}/>
            <Route path='/teacher-delete-account' element={<TeacherDeleteAccount/>}/>
            <Route path='/student-delete-account' element={<StudentDeleteAccount/>}/>
            <Route path='/student-courses' element={<StudentCourses/>}/>
            
        </Routes>
    )
}

export default AppRoutes;