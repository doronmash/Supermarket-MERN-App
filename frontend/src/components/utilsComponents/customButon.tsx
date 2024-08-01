import React, { FC, ReactElement } from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  visible?: boolean;
  variant?: 'contained' | 'text' | 'outlined';
}

export const CustomButton: FC<CustomButtonProps> = ({ label, onClick, visible = false, variant = 'outlined' }): ReactElement | null => {
  if (visible) {
    return null;
  }

  return (
    <Button
      variant={ variant }
      sx={{
        mt: 2,
        backgroundColor: '#34ebd6',
        color: '#1a1919',
        '&:hover': {
          backgroundColor: '#346beb'
        }
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
