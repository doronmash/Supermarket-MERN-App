import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../utilsComponents/customButon';

interface HeaderProps {
  userName: string;
  userId: string;
  userAdminStatus: boolean;
}

export const Header: React.FC<HeaderProps> = ({ userName, userId, userAdminStatus }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing user data, tokens, etc.
    // Then navigate back to the login page
    navigate('/');
  };

  const handleHistoryClick = () => {
    navigate('/grocery-payment-history', { state: { userId } });
  };

  const handleButtonHistoryVisable = () => {
    if (userAdminStatus) {
      return userAdminStatus;
    }
    else {
      return userName === "Guest";
    }
      
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
          Welcome, {userName}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CustomButton label="History" onClick={handleHistoryClick} visible={handleButtonHistoryVisable()} />
          <CustomButton label="Logout" onClick={handleLogout} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
