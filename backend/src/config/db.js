import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    globalThis.USE_MEMORY_STORE = false;
  } catch (error) {
    if (process.env.ALLOW_MEMORY_STORE === "true") {
      globalThis.USE_MEMORY_STORE = true;
      console.warn(`MongoDB unavailable, using in-memory demo store: ${error.message}`);
      return;
    }

    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
