import React, { FC, ReactElement, useState } from 'react';
import { Stack, Typography, TextField } from '@mui/material';
import { LoginButton } from './loginButtons';

export const LoginForm: FC = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
      <LoginButton email={email} password={password} />
      </Stack>
  )
}

export default LoginForm;
