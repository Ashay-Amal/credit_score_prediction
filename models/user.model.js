import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    crop_type: {
      type: String,
      required: true,
    },
    farm_area: {
      type: String,
      required: true,
    },
    irrigation_method: {
      type: String,
      required: true,
    },
    fertilizer_used: {
      type: String,
      required: true,
    },
    pesticide_used: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    soil_type: {
      type: String,
      required: true,
    },
    water_usage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
