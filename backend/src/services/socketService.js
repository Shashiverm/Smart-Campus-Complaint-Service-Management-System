import { Server } from "socket.io";

let ioInstance;

export const initSocket = (server) => {
  ioInstance = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      credentials: true
    }
  });

  ioInstance.on("connection", (socket) => {
    socket.on("join", (room) => {
      socket.join(room);
    });
  });

  return ioInstance;
};

export const getIO = () => ioInstance;
