import { createContext, useState, useRef, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { UserContext } from './UserContext';

const SocketContext = createContext();
const ContextProvider = ({ children }) => {

  return (
    <>{children}</>
  );
};

export { ContextProvider, SocketContext };
