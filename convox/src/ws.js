import { io } from 'socket.io-client';

export function connectWS(){
    return io('https://convox-2967.onrender.com');
}