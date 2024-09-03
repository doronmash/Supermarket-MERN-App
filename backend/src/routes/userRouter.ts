import { NextFunction, Request, Response, Router } from "express";
import fsPromises from "fs/promises";
import User from "../models/user.js"

const userRouter = Router();

// Define a route to get all users
userRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'An unknown error occurred' });
  }
});


// Define a route to add a new user
userRouter.post('/signup', async (req, res) => {
  const { name, email, password, adminRole } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const admin: boolean = adminRole === 'manager';
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password, admin });

    // Save the new user
    const savedUser = await newUser.save();
    console.log("saved user: ", savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'An unknown error occurred' + err });
  }
});



// Define a route for user login
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request body:", req.body);
  console.log("Email:", email);
  console.log("Password:", password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ email, password });
    console.log("User found:", user);
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'An unknown error occurred' });
  }
});


export default userRouter;