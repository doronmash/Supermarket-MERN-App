import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

interface SidebarProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='logo'
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
        Categories
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box
          sx={{ width: 150 }}
          role="presentation"
        >
          <Box sx={{ width: 100 }}>
            <List>
              <ListItem button onClick={() => handleCategoryClick('')}>
                <ListItemText primary="All" />
              </ListItem>
              {categories.map((category, index) => (
                <ListItem button key={index} onClick={() => handleCategoryClick(category)}>
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
