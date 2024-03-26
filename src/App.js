import AppRoutes from "./components/AppRoutes";
import './App.css';
import { UserContext } from "./components/UserContext";
import {useContext} from 'react';
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
