import mongoose from "mongoose";

export const connectDB = async (dburl) => {
  try {
    await mongoose.connect(dburl);
  } catch (error) {
    console.log("Error connecting database!");
  }
};
