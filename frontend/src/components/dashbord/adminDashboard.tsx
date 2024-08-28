// components/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Save as SaveIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface Grocery {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface AdminDashboardProps {
  searchQuery: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ searchQuery, onSearch, categories, selectedCategory, onCategorySelect }) => {
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [newGrocery, setNewGrocery] = useState<{ name: string; price: number; quantity: number; category: string }>({ name: '', price: 0, quantity: 0, category: '' });

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

  const handleEdit = (index: number, field: keyof Grocery, value: string | number) => {
    const updatedGroceries = [...groceries];
    if ((field === 'quantity' || field === 'price') && typeof value === 'number' && value < 0) {
      return; // Prevent negative values
    }
    updatedGroceries[index] = { ...updatedGroceries[index], [field]: value };
    setGroceries(updatedGroceries);
  };

  const handleSave = async (index: number) => {
    const grocery = groceries[index];
    try {
      await axios.put(`http://localhost:5000/groceries/${grocery._id}`, grocery);
      toast.success('Grocery updated successfully', { autoClose: 2000 });
    } catch (err) {
      console.error('Error updating grocery:', err);
      toast.error('Error updating grocery', { autoClose: 2000 });
    }
  };

  const handleAddGrocery = async () => {
    try {
      const response = await axios.post('http://localhost:5000/groceries', newGrocery);
      setGroceries([...groceries, response.data]);
      setNewGrocery({ name: '', price: 0, quantity: 0, category: '' });
      toast.success('Grocery added successfully', { autoClose: 2000 });
    } catch (err) {
      toast.error('Error adding new grocery', { autoClose: 2000 });
    }
  };

  const handleDeleteGrocery = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/groceries/${id}`);
      setGroceries(groceries.filter((grocery) => grocery._id !== id));
      toast.success('Grocery deleted successfully', { autoClose: 2000 });
    } catch (err) {
      console.error('Error deleting grocery:', err);
      toast.error('Error deleting grocery', { autoClose: 2000 });
    }
  };

  // Filter groceries based on search query and selected category
  const filteredGroceries = groceries.filter((grocery) => {
    return (
      grocery.name.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
      (selectedCategory ? grocery.category === selectedCategory : true)
    );
  });

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        {filteredGroceries.map((grocery, index) => (
          <Grid item xs={12} key={grocery._id}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <TextField
                label="Name"
                value={grocery.name}
                onChange={(e) => handleEdit(index, 'name', e.target.value)}
                variant="outlined"
                size="small"
                style={{ marginRight: 10 }}
              />
              <TextField
                label="Price"
                type="number"
                value={grocery.price}
                onChange={(e) => handleEdit(index, 'price', parseFloat(e.target.value))}
                variant="outlined"
                size="small"
                style={{ marginRight: 10 }}
              />
              <TextField
                label="Quantity"
                type="number"
                value={grocery.quantity}
                onChange={(e) => handleEdit(index, 'quantity', parseInt(e.target.value))}
                variant="outlined"
                size="small"
                style={{ marginRight: 10 }}
              />
              <FormControl style={{ marginRight: 10 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={grocery.category}
                  onChange={(e) => handleEdit(index, 'category', e.target.value as string)}
                  variant="outlined"
                  size="small"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton onClick={() => handleSave(index)} color="primary">
                <SaveIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteGrocery(grocery._id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
            <TextField
              label="Name"
              value={newGrocery.name}
              onChange={(e) => setNewGrocery({ ...newGrocery, name: e.target.value })}
              variant="outlined"
              size="small"
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Price"
              type="number"
              value={newGrocery.price}
              onChange={(e) => setNewGrocery({ ...newGrocery, price: parseFloat(e.target.value) })}
              variant="outlined"
              size="small"
              style={{ marginRight: 10 }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={newGrocery.quantity}
              onChange={(e) => setNewGrocery({ ...newGrocery, quantity: parseInt(e.target.value) })}
              variant="outlined"
              size="small"
              style={{ marginRight: 10 }}
            />
            <FormControl style={{ marginRight: 10 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newGrocery.category}
                onChange={(e) => setNewGrocery({ ...newGrocery, category: e.target.value as string })}
                variant="outlined"
                size="small"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={handleAddGrocery} variant="contained" color="primary">
              <AddIcon /> Add Grocery
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer limit={1} autoClose={5000} />
    </Box>
  );
};

export default AdminDashboard;
