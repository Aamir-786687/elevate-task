import User from "../model/userSchema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hash = await argon2.hash(password);
    const user = new User({ username, password: hash });
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await argon2.verify(user.password, password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne(req.body); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); 
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};


export { signup, login, getUser };
