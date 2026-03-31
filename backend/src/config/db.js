import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is required but not set");
  }

  // Validate URI format
  if (!mongoUri.includes("://")) {
    throw new Error("MONGODB_URI is invalid - missing protocol (e.g., mongodb+srv://)");
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri, {
      autoIndex: process.env.NODE_ENV !== "production",
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};
