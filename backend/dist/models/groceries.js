import { Schema, model } from "mongoose";
// Define the User schema
const groceriesSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true }
});
// Create the User model
const Groceries = model("Groceries", groceriesSchema);
export default Groceries;
