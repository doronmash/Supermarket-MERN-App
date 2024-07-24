import { Schema, model } from "mongoose";
// Define the User schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
});
// Create the User model
const User = model("User", userSchema);
export default User;
