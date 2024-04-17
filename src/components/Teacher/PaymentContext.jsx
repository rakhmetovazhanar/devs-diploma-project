import React, { createContext, useState, useContext } from 'react';

const PaymentButtonContext = createContext();

export const PaymentButtonProvider = ({ children }) => {
  const [clientPaymentStates, setClientPaymentStates] = useState({});

  const togglePayment = (clientId) => {
    setClientPaymentStates(prevStates => ({
      ...prevStates,
      [clientId]: !prevStates[clientId]
    }));
  };

  return (
    <PaymentButtonContext.Provider value={{ clientPaymentStates, togglePayment }}>
      {children}
    </PaymentButtonContext.Provider>
  );
};

export const usePaymentButton = () => {
  const context = useContext(PaymentButtonContext);
  if (!context) {
    throw new Error('usePaymentButton must be used within a PaymentButtonProvider');
  }
  return context;
};
