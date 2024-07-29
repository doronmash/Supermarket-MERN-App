import { Router } from "express";
import Payment from "../models/payment.js";

const userPayments = Router();

userPayments.get('/payments/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const payments = await Payment.find({ userId });
        res.json(payments);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

userPayments.post('/save-payment', async (req, res) => {
    const { userId, cartItems, totalAmount } = req.body;

    if (!userId || !cartItems || !totalAmount) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newPayment = new Payment({
            userId,
            date: new Date(),
            amount: totalAmount,
            items: cartItems,
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment saved successfully', payment: newPayment });
    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default userPayments;
