import React, { FC, useState } from 'react';
import { Stack, Typography, TextField, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';
import CustomButton from '../utilsComponents/customButon';
import { ToastContainer, toast, Id } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface SignupFormProps {
  onSignupSuccess: () => void;
}

const SignupForm: FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [adminRole, setAdminRole] = useState<string>('user');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminRole((event.target as HTMLInputElement).value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  let toastId: Id;

  const handleSignup = async () => {
    toast.dismiss(toastId);

    try {
      const response = await axios.post('http://localhost:5000/signup', { name, email, password, adminRole }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onSignupSuccess();
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toastId = toast.error('Signup failed.', { autoClose: 2000 });
      } else {
        toastId = toast.error('An error occurred while signing up.', { autoClose: 2000 });
        console.error('Error signing up:', error);
      }
      console.error('Error signing up:', error);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography mb={2} component="h2" variant="h6">Supermarket - Signup</Typography>
      <TextField
        id="email"
        label="Email"
        placeholder="Email"
        variant="outlined"
        size="small"
        fullWidth
        onChange={handleEmailChange}
      />
      <TextField
        id="password"
        label="Password"
        placeholder="Password"
        variant="outlined"
        size="small"
        type="password"
        fullWidth
        onChange={handlePasswordChange}
      />
      <TextField
        id="name"
        label="Name"
        placeholder="Name"
        variant="outlined"
        size="small"
        fullWidth
        onChange={handleNameChange}
      />

      <FormControl component="fieldset">
        <FormLabel component="legend">Role</FormLabel>
        <RadioGroup aria-label="role" name="role" value={adminRole} onChange={handleChange}>
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="manager" control={<Radio />} label="Manager" />
        </RadioGroup>
      </FormControl>
      <Stack direction="row" spacing={2}>
        <CustomButton label="Sign up" onClick={handleSignup} />
        <CustomButton label="Back" onClick={onSignupSuccess} />

      </Stack>

      <ToastContainer limit={1} autoClose={5000} />
    </Stack>
  );
};

export default SignupForm;
