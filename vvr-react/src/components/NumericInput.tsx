import React, { useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type NumericInputProps = {
    value: string,
    maxLength: number,
    onChange: (value: string) => void;
    additionalProps: TextFieldProps;
    label: string,
    error: boolean,
    helperText: string
}

const NumericInput : React.FC<NumericInputProps> = ({ label, value, maxLength, onChange, error, helperText }) => {
  const [numericString, setNumericString] = useState('');

  const handleInputChange = (event) => {
    // Allow only numeric input
    const value = event.target.value.replace(/[^0-9]/g, '');

    // Limit the length of the numeric string to between 3 and 4 characters
    if (value.length <= maxLength) {
      onChange(value);
    }
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={handleInputChange}
      fullWidth
      error={error}
      helperText={helperText}
      
    />
  );
};

export default NumericInput;
