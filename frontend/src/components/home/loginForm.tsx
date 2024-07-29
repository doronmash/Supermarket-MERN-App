// import React, { FC, useState } from 'react';
// import { Stack, Typography, TextField } from '@mui/material';
// import CustomButton from '../utilsComponents/customButon';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast, Id } from 'react-toastify';
// import axios from 'axios';

// interface LoginFormProps {
//   onRegisterClick: () => void;
// }

// const LoginForm: FC<LoginFormProps> = ({ onRegisterClick }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//     let toastId: Id;
//   const navigate = useNavigate();

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleLogin = async () => {
//     toast.dismiss(toastId);

//     try {
//       const response = await axios.post('http://localhost:5000/login', { email, password }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       // toastId = toast.success('Login successful!', { autoClose: 2000 });
//       navigate('/dashboard', { state: { user: response.data.user } });
//     } catch (error: any) {
//       if (error.response && error.response.status === 401) {
//         toastId = toast.error('Invalid email or password.', { autoClose: 2000 });
//       } else {
//         toastId = toast.error('An error occurred while logging in.', { autoClose: 2000 });
//       }
//       console.error('Error logging in:', error);
//     }
//   };

//   const handleLoginAsGuest = async () => {
//     toast.dismiss(toastId);

//     try {
//       toastId = toast.success('Login as guest', { autoClose: 2000 });
//       navigate('/dashboard', { state: { user: null } });
//     } catch (error: any) {
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <Stack spacing={2}>
//       <Typography mb={2} component="h2" variant="h6">Supermarket</Typography>
//       <TextField
//         id="email"
//         label="Email"
//         placeholder="Email"
//         variant="outlined"
//         size="small"
//         fullWidth
//         onChange={handleEmailChange}
//       />
//       <TextField
//         id="password"
//         label="Password"
//         placeholder="Password"
//         variant="outlined"
//         size="small"
//         type="password"
//         fullWidth
//         onChange={handlePasswordChange}
//       />
//       <CustomButton label="Log in" onClick={handleLogin} />
//       <CustomButton label="Register" onClick={onRegisterClick} />
//       <CustomButton label="Log In As Guest" onClick={handleLoginAsGuest} />
//       <ToastContainer limit={1} autoClose={5000} />
//     </Stack>
//   );
// };

// export default LoginForm;



// components/loginForm.tsx
import React, { FC, ReactElement, useState } from 'react';
import { Stack, Typography, TextField, Link } from '@mui/material';
import CustomButton from '../utilsComponents/customButon';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Id } from 'react-toastify';
import axios from 'axios';

interface LoginFormProps {
  onRegisterClick: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onRegisterClick }): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let toastId: Id;

  const handleLogin = async () => {
    toast.dismiss(toastId);

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toastId = toast.success('Login successful!', { autoClose: 2000 });
      navigate('/dashboard', { state: { user: response.data.user, userId: response.data.user._id } });
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toastId = toast.error('Invalid email or password.', { autoClose: 2000 });
      } else {
        toastId = toast.error('An error occurred while logging in.', { autoClose: 2000 });
      }
      console.error('Error logging in:', error);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography mb={2} component="h2" variant="h6">Supermarket</Typography>
      <TextField
        id="email"
        label="Email"
        placeholder="Email"
        variant="outlined"
        size="small"
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        placeholder="Password"
        variant="outlined"
        size="small"
        type="password"
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton label="Log in" onClick={handleLogin} />
      <Link component="button" variant="body2" onClick={onRegisterClick}>
        Don't have an account? Register here.
      </Link>
      <ToastContainer limit={1} autoClose={5000} />
    </Stack>
  );
};

export default LoginForm;
