// components/loginForm/loginButtons.tsx
import React, { FC, ReactElement } from 'react';
import { Stack } from '@mui/material';
import { CustomButton } from '../utilsComponents/customButon';
import axios from 'axios';
import { ToastContainer, toast, Id } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface LoginButtonProps {
    email: string;
    password: string;
}

export const LoginButton: FC<LoginButtonProps> = ({ email, password }): ReactElement => {
    let toastId: Id;
    const navigate = useNavigate();

    const hundleLoginAsGuest = async () => {
        toast.dismiss(toastId);

        try {
            toastId = toast.success('Login as guest', { autoClose: 2000 });
            navigate('/dashboard', { state: { user: null } });
        } catch (error: any) {
            console.error('Error logging in:', error);
        }
    };

    const handleLogin = async () => {
        toast.dismiss(toastId);

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toastId = toast.success('Login successful!', { autoClose: 2000 });
            navigate('/dashboard', { state: { user: response.data.user } });
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                toastId = toast.error('Invalid email or password.', { autoClose: 2000 });
            } else {
                toastId = toast.error('An error occurred while logging in.', { autoClose: 2000 });
            }
            console.error('Error logging in:', error);
        }
    };

    const handleSignUp = async () => {
        toast.dismiss(toastId);

        try {
            const response = await axios.post('http://localhost:5000/users', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toastId = toast.success('Sign-up successful!', { autoClose: 2000 });
            navigate('/dashboard', { state: { user: response.data.user } });
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                toastId = toast.error('Sign-up failed. Please provide valid email and password.', { autoClose: 2000 });
            } else {
                toastId = toast.error('An error occurred during sign-up.', { autoClose: 2000 });
            }
            console.error('Error signing up:', error);
        }
    };

    return (
        <Stack direction="row" spacing={2}>
            <CustomButton label="Log in" onClick={handleLogin} />
            <CustomButton label="Sign Up" onClick={handleSignUp} />
            <CustomButton label="Log In As Guest" onClick={hundleLoginAsGuest} />
            <ToastContainer limit={1} autoClose={5000} />
        </Stack>
    );
};

export default LoginButton;
