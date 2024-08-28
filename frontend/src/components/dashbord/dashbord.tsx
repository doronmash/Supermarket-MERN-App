// components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from './header';
import ShoppingCart from './shoppingCart';
import Groceries from './groceries';
import Sidebar from './slidebar';
import AdminDashboard from './adminDashboard';
import axios from 'axios';

interface User {
  _id: string;
  email: string;
  name: string;
  admin: boolean;
}

interface DashboardProps {
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [cartItems, setCartItems] = useState<{ name: string; quantity: number; price: number }[]>([]);
  const [groceries, setGroceries] = useState<{ name: string; price: number; quantity: number; category: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear the search query when changing categories
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePaymentSuccess = () => {
    fetchGroceries();
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

  const categories = ['Fruit', 'Meat', 'Milk', 'Vegetables', 'Bread', 'Snacks', 'Goods'];

  // Filter groceries based on search query and selected category
  const filteredGroceries = groceries.filter((grocery) => {
    return (
      grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
      (selectedCategory ? grocery.category === selectedCategory : true)
    );
  });

  return (
    <Box>
      <Header userName={getUserName()} userId={getUserId()} userAdminStatus={getUserAdminStatus()} />
      <Box display="flex" flexDirection="row">
        <IconButton onClick={() => setIsSidebarOpen(true)}>
          <SearchIcon />
        </IconButton>
        <Sidebar categories={categories} onCategorySelect={handleCategorySelect} />

        <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" p={2}>
          <TextField
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            variant="outlined"
            placeholder="Search groceries"
            sx={{ marginBottom: 2, width: '100%', maxWidth: '400px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Grid container spacing={2} maxWidth="1200px" width="100%" px={2}>
            {user && user.admin ? (
              <AdminDashboard
                searchQuery={searchQuery}
                onSearch={handleSearch}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
              />
            ) : (
              <>
                <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                    maxHeight="80vh"
                    overflow="auto"
                  >
                    <Groceries groceries={filteredGroceries} selectedCategory={selectedCategory} userName={getUserName()} onAddToCart={handleAddToCart} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} display="flex" justifyContent="center">
                  <ShoppingCart
                    cartItems={cartItems}
                    userName={getUserName()}
                    userId={getUserId()}
                    onRemoveFromCart={handleRemoveFromCart}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
