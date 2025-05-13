import express from "express";
import { signup, login, getUser } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/signup", getUser)
router.post("/login", login);

export default router;
