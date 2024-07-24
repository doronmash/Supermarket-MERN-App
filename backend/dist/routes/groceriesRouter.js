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
import Groceries from "../models/groceries.js";
const userGroceries = Router();
// Define a route to get all groceries
userGroceries.get('/groceries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceries = yield Groceries.find();
        res.json(groceries);
    }
    catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'An unknown error occurred' });
    }
}));
// Define a route to update a grocery
userGroceries.put('/groceries/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    try {
        const grocery = yield Groceries.findById(id);
        if (!grocery) {
            return res.status(404).json({ message: 'Grocery not found' });
        }
        grocery.name = name || grocery.name;
        grocery.price = price || grocery.price;
        grocery.quantity = quantity || grocery.quantity;
        yield grocery.save();
        res.status(200).json(grocery);
    }
    catch (err) {
        console.error('Error updating grocery:', err);
        res.status(500).json({ message: 'Failed to update grocery' });
    }
}));
// Define a route to add a new grocery
userGroceries.post('/groceries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, quantity } = req.body;
    if (!name || price == null || quantity == null) {
        return res.status(400).json({ message: 'Name, price, and quantity are required' });
    }
    try {
        // Check if a grocery with the same name already exists (case-insensitive)
        const existingGrocery = yield Groceries.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
        if (existingGrocery) {
            return res.status(400).json({ message: 'A grocery with the same name already exists' });
        }
        // Add the new grocery
        const newGrocery = new Groceries({ name, price, quantity });
        yield newGrocery.save();
        res.status(201).json(newGrocery);
    }
    catch (err) {
        console.error('Error adding grocery:', err);
        res.status(500).json({ message: 'Failed to add grocery' });
    }
}));
// Define a route to delete a grocery
userGroceries.delete('/groceries/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield Groceries.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Grocery not found' });
        }
        res.status(200).json({ message: 'Grocery deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting grocery:', err);
        res.status(500).json({ message: 'Failed to delete grocery' });
    }
}));
userGroceries.post('/update-groceries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartItems } = req.body;
        // Iterate over each cart item and update the quantity in the database
        for (const item of cartItems) {
            yield Groceries.updateOne({ name: item.name }, { $inc: { quantity: -item.quantity } });
        }
        res.status(200).json({ message: 'Groceries updated successfully' });
    }
    catch (err) {
        console.error('Error updating groceries:', err);
        res.status(500).json({ message: 'Failed to update groceries' });
    }
}));
export default userGroceries;
