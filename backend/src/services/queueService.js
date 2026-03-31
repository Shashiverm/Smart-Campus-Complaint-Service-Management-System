import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { sendMail } from "./mailService.js";

const redisUrl = process.env.REDIS_URL;
let connection = null;

if (!redisUrl) {
  console.warn("REDIS_URL not set. Notifications will be sent directly via SMTP (no queue).");
} else {
  console.log("Attempting Redis connection...");
  try {
    connection = new IORedis(redisUrl, { 
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      enableOfflineQueue: false,
      connectTimeout: 10000,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        console.warn(`Redis reconnection attempt ${times}, delay: ${delay}ms`);
        return delay;
      }
    });

    connection.on("error", (error) => {
      console.error("Redis connection error:", error.message);
    });

    connection.on("connect", () => {
      console.log("Redis connected successfully");
    });
  } catch (error) {
    console.error("Failed to create Redis connection:", error.message);
    connection = null;
  }
}

export const notificationQueue = connection ? new Queue("notification-queue", { connection }) : null;

export const enqueueNotification = async (payload) => {
  if (!notificationQueue) {
    await sendMail(payload);
    return;
  }

  await notificationQueue.add("send-email", payload, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1500
    }
  });
};

export const startNotificationWorker = () => {
  if (!connection) {
    console.warn("REDIS_URL missing. BullMQ worker disabled.");
    return null;
  }

  return new Worker(
    "notification-queue",
    async (job) => {
      await sendMail(job.data);
    },
    { connection }
  );
};
