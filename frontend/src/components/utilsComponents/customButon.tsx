import React, { FC, ReactElement } from 'react';
import { Button } from '@mui/material';

interface CustomButtonProps {
  label: string;
  onClick: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({ label, onClick }): ReactElement => {
  return (
    <Button
      variant="contained"
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
