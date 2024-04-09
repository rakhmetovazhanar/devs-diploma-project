import React, { createContext, useState, useContext } from 'react';

const PaymentButtonContext = createContext();

export const PaymentButtonProvider = ({ children }) => {
  const [isClickedPayment, setIsClickedPayment] = useState(false);

  const togglePayment = () => {
    setIsClickedPayment(!isClickedPayment);
  };

  return (
    <PaymentButtonContext.Provider value={{ isClickedPayment, togglePayment }}>
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
