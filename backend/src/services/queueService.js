import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { sendMail } from "./mailService.js";

const redisUrl = process.env.REDIS_URL;
const connection = redisUrl ? new IORedis(redisUrl, { maxRetriesPerRequest: null }) : null;

export const notificationQueue = connection
  ? new Queue("notification-queue", { connection })
  : null;

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
