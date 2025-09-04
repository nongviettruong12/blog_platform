import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, { dbName: "blog_platform" });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
