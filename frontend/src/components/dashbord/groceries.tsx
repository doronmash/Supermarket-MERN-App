// components/Groceries.tsx
import React from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface GroceryItem {
  name: string;
  price: number;
  quantity: number;
}

interface GroceriesProps {
  groceries: GroceryItem[];
  userName: String;
  onAddToCart: (item: GroceryItem) => void;
}

const Groceries: React.FC<GroceriesProps> = ({ groceries, userName, onAddToCart }) => {
  return (
    <Box width="100%">
      <Grid container spacing={2}>
        {groceries.map((grocery, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
              border={2}
              borderColor="grey.300"
              borderRadius={2}
              boxShadow={3}
            >
              <Typography variant="h6">{grocery.name}</Typography>
              <Typography variant="body1">Quantity: {grocery.quantity}</Typography>
              <Typography variant="body1">${grocery.price.toFixed(2)}</Typography>
              <Box display="flex" flexDirection="column" mt={1}>
                <IconButton
                  color="primary"
                  onClick={() => onAddToCart(grocery)}
                  aria-label="add to cart"
                  disabled={grocery.quantity === 0 || userName === 'Guest'}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Groceries;
