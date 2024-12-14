import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const jwt_secret = "vssslkaueafhabakjb";

export const signup = async (req, res) => {
  const {
    full_name,
    email,
    password,
    crop_type,
    farm_area,
    irrigation_method,
    fertilizer_used,
    pesticide_used,
    season,
    soil_type,
    water_usage,
  } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    return res.render("signup", { message: "Email already registered!" });
  }

  /* const salt = bcryptjs.genSalt(10);
  const hashedPassword = bcryptjs.hash(password, salt); */

  await userModel.create({
    full_name,
    email,
    password,
    crop_type,
    farm_area,
    irrigation_method,
    fertilizer_used,
    pesticide_used,
    season,
    soil_type,
    water_usage,
  });

  const saved_user = await userModel.findOne({ email });

  const token = jwt.sign({ userID: saved_user._id }, jwt_secret, {
    expiresIn: "5d",
  });

  res.cookie("uid", token, { maxAge: 900000, httpOnly: true });
  return res.redirect("/");
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.render("signin", {
      message: "Email not registered, Please signup!",
    });
  }

  //const is_match = bcryptjs.compare(password, user.password);
  if (password === user.password) {
    const token = jwt.sign({ userID: user._id }, jwt_secret, {
      expiresIn: "5d",
    });

    res.cookie("uid", token, { maxAge: 900000, httpOnly: true });

    return res.redirect("/");
  } else {
    return res.render("signin", { message: "Incorrect password!" });
  }
};
