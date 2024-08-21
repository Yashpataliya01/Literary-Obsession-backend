import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import Users from "../models/users.model.js"
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cookieParser());

export const signup = async(req, res) => {
  const { username, email, password } = req.body;
  try {
    const userData = await Users.findOne({email})
    if (userData) {
      res.status(400).json({error: "User already created"});
    }
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) {
        res.status(400).json({error: "Something went wrong"});
      } else {
        const newuser = Users.create({
          username,
          email,
          password: hash,
        })
        res.status(200).json({message: "user created"})
      }
    })
  } catch (error) {
    res.status(400).json({error: "User already created"});
  }
}

export const signin = async(req, res) => {
  const { email, password } = req.body;
  console.log("email", email, password);
  try {
    const user = await Users.findOne({email})
    if(!user) {
      return res.status(500).json({message:"Create User First"});
    }
    bcrypt.compare(password, user.password, function(err,result){
      if (err) {
        return res.status(400).json({message:"Check Password Again"})
      }
      if(result) {
        let token = jwt.sign({email: email},process.env.JWT_SECRET);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        return res.status(200).json({ message: user });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    })
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export const getuser = async(req, res) => {
 const token = req.cookies.token;
 if(!token) {
  return res.status(401).json({ error: "No token provided" });
 }
 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Users.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password, ...userData } = user.toObject();
    res.status(200).json(userData);
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};

export const signout = async(req, res) => {
  res.cookie('token', '');
  return res.status(200).json({ message: "Logout successful" });
}