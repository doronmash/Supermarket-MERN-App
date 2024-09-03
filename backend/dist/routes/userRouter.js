var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import User from "../models/user.js";
const userRouter = Router();
// Define a route to get all users
userRouter.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.json(users);
    }
    catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'An unknown error occurred' });
    }
}));
// Define a route to add a new user
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, adminRole } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const admin = adminRole === 'manager';
    try {
        // Check if email already exists
        const existingUser = yield User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Create a new user
        const newUser = new User({ name, email, password, admin });
        // Save the new user
        const savedUser = yield newUser.save();
        console.log("saved user: ", savedUser);
        res.status(201).json(savedUser);
    }
    catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ message: 'An unknown error occurred' + err });
    }
}));
// Define a route for user login
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("Received login request body:", req.body);
    console.log("Email:", email);
    console.log("Password:", password);
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = yield User.findOne({ email, password });
        console.log("User found:", user);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'An unknown error occurred' });
    }
}));
export default userRouter;
