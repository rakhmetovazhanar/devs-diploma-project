import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import Context from './components/UserContext';
import { PaymentButtonProvider } from './components/Teacher/PaymentContext';
import { ContextProvider } from './components/SocketContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context>
        <ContextProvider>
            <PaymentButtonProvider>
                <Router>
                    <App />
                </Router>
            </PaymentButtonProvider>
        </ContextProvider>
    </Context>
    
);

