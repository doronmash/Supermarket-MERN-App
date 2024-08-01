import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import userGroceries from './routes/groceriesRouter.js';
import userPayments from './routes/paymentsRouter.js';


const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

app.use('/', userRouter);
app.use('/', userGroceries);
app.use('/', userPayments);


// Connect to MongoDB using mongoose
mongoose.connect('mongodb://localhost:27017/supermarket')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a route
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Start the server
app.listen(port, () => {
  console.log('Server running on port:', port);
});