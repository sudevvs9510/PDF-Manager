import bcrypt from "bcryptjs/dist/bcrypt.js";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_TOKEN;

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {

    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] })

    if (existingUser) {
      return res.status(401).json({ message: "Email or Username already exists" });
    }

    const newUser = new UserModel({ username, email, password });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message })
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    } else if (user.isBlocked) {
      console.log("User blocked");
      return res.status(403).json({ error: "This account has been blocked." });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Create JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token, userId: user._id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};


export const userData = async (req, res) => {
  console.log("Fetching user data");
  try {
    const userId = req.userId; 
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
    const user = await UserModel.findById(userId).select('username email'); 
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user data:", err);
    return res.status(500).json({ message: "Server error fetching user data." });
  }
};



