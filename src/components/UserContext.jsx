import React,  { createContext, useState, useEffect } from "react";

export const UserContext=createContext({
    user: {
        loggedIn: false,
        username: '',
        first_name: '', 
        last_name : '',
        token: '',
        role: 'null',
        user_id: ''
      },
      setUser: () => {} // Placeholder function
});

const Context = ({children}) =>{
//     const [user,setUser] = useState(()=>{
//         const storedUser = localStorage.getItem("user");
//         return storedUser ? JSON.parse(storedUser) : {
//         loggedIn : false,
//         username : '',
//         first_name:'', 
//         last_name : '',
//         token: '',
//         role:'',
//         user_id: ''
//         }
// });

const [user,setUser] = useState({ 
    loggedIn : false,
    username : '',
    first_name:'', 
    last_name : '',
    token: '',
    role:'null',
    user_id: ''
    
});

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    

    return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
    )
}

export default Context;