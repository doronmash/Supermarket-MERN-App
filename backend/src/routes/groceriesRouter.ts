import { NextFunction, Request, Response, Router } from "express";
import fsPromises from "fs/promises";
import Groceries from "../models/groceries.js"

const userGroceries = Router();

// Define a route to get all groceries
userGroceries.get('/groceries', async (req, res) => {
  try {
    const groceries = await Groceries.find();
    res.json(groceries);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'An unknown error occurred' });
  }
});

// Define a route to update a grocery
userGroceries.put('/groceries/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;

  try {
    const grocery = await Groceries.findById(id);
    if (!grocery) {
      return res.status(404).json({ message: 'Grocery not found' });
    }

    grocery.name = name || grocery.name;
    grocery.price = price || grocery.price;
    grocery.quantity = quantity || grocery.quantity;
    grocery.category = category || grocery.category;


    await grocery.save();
    res.status(200).json(grocery);
  } catch (err) {
    console.error('Error updating grocery:', err);
    res.status(500).json({ message: 'Failed to update grocery' });
  }
});

// Define a route to add a new grocery
userGroceries.post('/groceries', async (req, res) => {
  const { name, price, quantity, category } = req.body;

  if (!name || price == null || quantity == null || category == null) {
    return res.status(400).json({ message: 'Name, price, and quantity are required' });
  }

  try {
    // Check if a grocery with the same name already exists (case-insensitive)
    const existingGrocery = await Groceries.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });

    if (existingGrocery) {
      return res.status(400).json({ message: 'A grocery with the same name already exists' });
    }

    // Add the new grocery
    const newGrocery = new Groceries({ name, price, quantity, category });
    await newGrocery.save();
    res.status(201).json(newGrocery);
  } catch (err) {
    console.error('Error adding grocery:', err);
    res.status(500).json({ message: 'Failed to add grocery' });
  }
});


// Define a route to delete a grocery
userGroceries.delete('/groceries/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Groceries.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Grocery not found' });
    }

    res.status(200).json({ message: 'Grocery deleted successfully' });
  } catch (err) {
    console.error('Error deleting grocery:', err);
    res.status(500).json({ message: 'Failed to delete grocery' });
  }
});

userGroceries.post('/update-groceries', async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Iterate over each cart item and update the quantity in the database
    for (const item of cartItems) {
      await Groceries.updateOne(
        { name: item.name },
        { $inc: { quantity: -item.quantity } }
      );
    }

    res.status(200).json({ message: 'Groceries updated successfully' });
  } catch (err) {
    console.error('Error updating groceries:', err);
    res.status(500).json({ message: 'Failed to update groceries' });
  }
});


export default userGroceries;