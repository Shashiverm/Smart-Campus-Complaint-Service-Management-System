import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initSocket } from "./services/socketService.js";
import { startNotificationWorker } from "./services/queueService.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const port = Number(process.env.PORT || 5000);
    const server = http.createServer(app);
    const io = initSocket(server);

    io.on("connection", (socket) => {
      socket.on("join:user", (userId) => socket.join(`user:${userId}`));
      socket.on("join:role", (role) => socket.join(`role:${role}`));
    });

    startNotificationWorker();

    server.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

startServer();
