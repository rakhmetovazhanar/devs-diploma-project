import { io } from 'socket.io-client';

const socket = new io('http://134.209.250.123:3030');

export default socket;