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
        </Routes>
    )
}

export default AppRoutes;