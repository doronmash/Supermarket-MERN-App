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
import Payment from "../models/payment.js";
const userPayments = Router();
userPayments.get('/payments/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const payments = yield Payment.find({ userId });
        res.json(payments);
    }
    catch (error) {
        res.status(500).send('Server error');
    }
}));
userPayments.post('/save-payment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield newPayment.save();
        res.status(201).json({ message: 'Payment saved successfully', payment: newPayment });
    }
    catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
export default userPayments;
