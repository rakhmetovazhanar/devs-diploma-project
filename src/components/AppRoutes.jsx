import React from 'react';
import {Routes , Route} from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import RegisterStudent from './RegisterStudent';
import RegisterInstructor from './RegisterInstructor';
import ForgotPassword from './ForgotPassword';

const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/student-register' element={<RegisterStudent/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/instructor-register' element={<RegisterInstructor/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
        </Routes>
    )
}

export default AppRoutes;