import express from "express";

import { signin, signup } from "../controllers/user.controller.js";
import { checkForAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/home", checkForAuth);

router.get("/", (req, res) => {
  return res.redirect("/home");
});

router.get("/home", (req, res) => {
  return res.render("home");
});
router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/logout", (req, res) => {
  return res.clearCookie("uid").redirect("/signin");
});
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
