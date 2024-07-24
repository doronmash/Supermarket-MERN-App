import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../utilsComponents/customButon';

interface HeaderProps {
  userEmail: string;
}

export const Header: React.FC<HeaderProps> = ({ userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing user data, tokens, etc.
    // Then navigate back to the login page
    navigate('/');
  };

  return (
    <AppBar position="static"
      sx={{
        backgroundColor: 'rgba(52, 235, 214, 0.1)',
        border: '2px solid #34ebe5',
        borderRadius: '8px'
      }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: '#0a0a0a'  // Change the color to a bright color
          }}
        >
          Welcome, {userEmail}
        </Typography>
        <CustomButton label="Logout" onClick={handleLogout} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
