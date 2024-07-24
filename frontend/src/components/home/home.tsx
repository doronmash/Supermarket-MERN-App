import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import Dashboard from '../dashbord/dashbord';

const Home: React.FC = () => {
  const [isLoginComponent, setIsLoginComponent] = useState(true);

  const handleRegisterClick = () => {
    setIsLoginComponent(false);
  };

  const handleSignupSuccess = () => {
    setIsLoginComponent(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="70vh"
              px={4}
              my={6}
              sx={{
                backgroundColor: 'rgba(52, 235, 214, 0.1)',
                border: '2px solid #34ebe5',
                borderRadius: '8px',
              }}
            >
              {isLoginComponent ? (
                <LoginForm onRegisterClick={handleRegisterClick} />
              ) : (
                <SignupForm onSignupSuccess={handleSignupSuccess} />
              )}
            </Box>
          }
        />
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const DashboardWrapper: React.FC = () => {
  const location = useLocation();
  const user = location.state?.user || null;

  return <Dashboard user={user} />;
};

export default Home;
