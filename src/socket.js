import { io } from 'socket.io-client';

const socket = new io('https://genuis.tech');
export default socket;