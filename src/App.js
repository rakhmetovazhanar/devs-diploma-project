import AppRoutes from "./components/AppRoutes";
import './App.css';
import { UserContext } from "./components/UserContext";
import Home from "./components/Home";
import {useContext} from 'react';
import LoginPage from "./components/LoginPage";
import { BrowserRouter } from "react-router-dom";
import {useEffect} from 'react';

function App() {
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = ''; 
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  const user = useContext(UserContext);
  return (
      <div className="App">
        <AppRoutes/>
      </div>
  );
}

export default App;
