/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import io from "socket.io-client";
const VITE_SOCKET: string = import.meta.env.VITE_SOCKET;

export const socket = io(VITE_SOCKET);
