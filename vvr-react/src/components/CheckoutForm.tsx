import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Grid, Button } from '@mui/material';
import { Customer } from '../types/Customer';
//import CreditCardNumberMask from './CreditCardNumberMask';
import InputMask from "react-input-mask";
import MonthYearPicker from './MonthYearPicker';


type CheckoutFormProps = {
    customer: Customer;    
}

const schema = z.object({
  firstName: z.string().nonempty({ message: 'First Name is required' }),
  lastName: z.string().nonempty({ message: 'Last Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  creditCardNumber: z.string().refine((value) => value.length != 25, {
    message: 'Invalid credit card number',
  }),
  expirationDate: z.date()
});

const CheckoutForm : React.FC<CheckoutFormProps> = ({ customer }) => {
  const { handleSubmit, control, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        creditCardNumber: ""
    }
  });

  const onSubmit = (data:any) => {
    // Handle form submission
    console.log(data);
  };



  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                label="First Name"                
                {...field}
                fullWidth
                error={!!formState.errors?.firstName}
                helperText={formState.errors?.firstName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                label="Last Name"
                {...field}
                fullWidth
                error={!!formState.errors?.lastName}
                helperText={formState.errors?.lastName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                {...field}
                fullWidth
                error={!!formState.errors?.email}
                helperText={formState.errors?.email?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
        
            <Controller
            name="creditCardNumber"
            control={control}
            defaultValue=""
            rules={{ required: 'Phone number is required' }}
            render={({ field }) => (
                <InputMask
                mask="9999 - 9999 - 9999 - 9999"
                maskChar="_"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                >
                {(inputProps) => (
                    <TextField
                    {...inputProps}
                    label="Credit Card"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(formState.errors.creditCardNumber)}
                    helperText={formState.errors.creditCardNumber?.message}
                    />
                )}
                </InputMask>
            )}
            />




        </Grid>
        <Grid item xs={12}>
            <MonthYearPicker
            
            value={new Date()} // Initial value, you can set it to a default or leave it empty
            onChange={(date) => console.log(date)}
            />

            
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
    
  );
};

export default CheckoutForm;
