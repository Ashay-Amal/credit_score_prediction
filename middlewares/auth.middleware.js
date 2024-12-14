import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const jwt_secret = "vssslkaueafhabakjb";

export const checkForAuth = async (req, res, next) => {
  const token = req.cookies.uid;
  if (!token) {
    return res.redirect("/signin");
  }
  try {
    const { userID } = jwt.verify(token, jwt_secret);
    const user = await userModel.findById(userID).select("-password");
    req.user = user;
    next();
  } catch (error) {
    return res.redirect("/signin");
  }
};
