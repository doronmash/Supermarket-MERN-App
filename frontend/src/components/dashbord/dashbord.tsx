import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Header from './header';
import ShoppingCart from './shoppingCart';
import Groceries from './groceries';
import AdminDashboard from './adminDashboard';
import axios from 'axios';

// Define the User interface
interface User {
  _id: string;
  email: string;
  name: string;
  admin: boolean;
}

// Define the props for the Dashboard component
interface DashboardProps {
  user: User | null;
}

// Dashboard component
const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [cartItems, setCartItems] = useState<{ name: string; quantity: number; price: number }[]>([]);
  const [groceries, setGroceries] = useState<{ name: string; price: number; quantity: number }[]>([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/groceries');
        setGroceries(response.data);
      } catch (err) {
        console.error('Error fetching groceries:', err);
      }
    };

    fetchGroceries();
  }, []);

  const handleAddToCart = (item: { name: string; price: number; quantity: number }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });

    setGroceries((prevGroceries) =>
      prevGroceries.map((grocery) =>
        grocery.name === item.name
          ? { ...grocery, quantity: grocery.quantity - 1 }
          : grocery
      )
    );
  };

  const handleRemoveFromCart = (item: { name: string; price: number }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.name === item.name);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevItems.filter((cartItem) => cartItem.name !== item.name);
    });

    setGroceries((prevGroceries) =>
      prevGroceries.map((grocery) =>
        grocery.name === item.name
          ? { ...grocery, quantity: grocery.quantity + 1 }
          : grocery
      )
    );
  };

  const handlePaymentSuccess = () => {
    // Refresh groceries list
    fetchGroceries();

    // Clear the shopping cart
    setCartItems([]);
  };

  const fetchGroceries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/groceries');
      setGroceries(response.data);
    } catch (err) {
      console.error('Error fetching groceries:', err);
    }
  };

  const getUserName = () => {
    return user ? user.name : 'Guest';
  };

  const getUserId = () => {
    return user ? user._id : '';
  };

  const getUserAdminStatus = () => {
    return user ? user.admin : false;
  };

  return (
    <Box>
      <Header userName={getUserName()} userId={getUserId()} userAdminStatus={getUserAdminStatus()} />
      <Box display="flex" justifyContent="center" p={2}>
        <Grid container spacing={2} maxWidth="1200px" width="100%" px={2}>
          {user && user.admin ? (
            <AdminDashboard />
          ) : (
            <>
              <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                <ShoppingCart
                  cartItems={cartItems}
                  userName={getUserName()}
                  userId={getUserId()} // Pass userId here
                  onRemoveFromCart={handleRemoveFromCart}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </Grid>
              <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                  <Typography variant="h4" gutterBottom>
                    Available Groceries
                  </Typography>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                    maxHeight="80vh"
                    overflow="auto"
                  >
                    <Groceries groceries={groceries} userName={getUserName()} onAddToCart={handleAddToCart} />
                  </Box>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
