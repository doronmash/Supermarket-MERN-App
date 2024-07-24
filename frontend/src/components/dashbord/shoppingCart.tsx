// components/ShoppingCart.tsx
import React from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import axios from 'axios';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface ShoppingCartProps {
  cartItems: CartItem[];
  userEmail: String;
  onRemoveFromCart: (item: { name: string; price: number }) => void;
  onPaymentSuccess: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, userEmail, onRemoveFromCart, onPaymentSuccess }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = async () => {
    const totalPrice = calculateTotalPrice();

    // Display confirmation dialog
    const isConfirmed = window.confirm(`Total price is $${totalPrice.toFixed(2)}. Do you want to proceed with payment?`);

    if (isConfirmed) {
      try {
        // Update the database with the new quantities
        console.log("cartItems: ", cartItems)
        await axios.post('http://localhost:5000/update-groceries', { cartItems });

        // Notify parent component of payment success
        onPaymentSuccess();

        alert('Payment successful!');
      } catch (err) {
        console.error('Error updating groceries:', err);
        alert('Failed to update groceries');
      }
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      padding={2}
      borderColor="grey.300"
      borderRadius={2}
      boxShadow={3}
      maxWidth='200px'
      width='100%'
    >
      <Box flexGrow={1}>
        <Typography variant="h6">Shopping Cart</Typography>
        {cartItems.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" mb={1}>
            <Typography variant="body1" flexGrow={1}>
              {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
            </Typography>
            <IconButton color="secondary" onClick={() => onRemoveFromCart(item)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="auto"
      >

        <Stack direction="row" spacing={4}>
          <Typography>Total price ${calculateTotalPrice().toFixed(2)}</Typography>
          <IconButton
            color="primary"
            onClick={handlePayment}
            disabled={userEmail === 'Guest'}
          >
            <PaymentIcon />
          </IconButton>
        </Stack>



      </Box>
    </Box>
  );
};

export default ShoppingCart;
