// models/Payment.js
import { Schema, model } from 'mongoose';

// Define the Payment schema
const paymentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

// Create the Payment model
const Payment = model('Payment', paymentSchema);

export default Payment;