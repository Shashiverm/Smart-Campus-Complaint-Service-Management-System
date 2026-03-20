import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is required");
  }

  await mongoose.connect(mongoUri, {
    autoIndex: process.env.NODE_ENV !== "production"
  });

  console.log("MongoDB connected");
};
