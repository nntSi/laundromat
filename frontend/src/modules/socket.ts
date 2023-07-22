/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import io from "socket.io-client";
const VITE_BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

export const socket = io(VITE_BACKEND_URL, {
  rejectUnauthorized: false,
  path: "/socket.io/",
  transports: ["websocket"],
});
