import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem, Grid, Select, InputLabel, FormControl } from '@mui/material';
import { string, object, number } from 'zod';
import InputMask from 'react-input-mask';

const schema = object({
    firstName: string().refine((value) => value.trim() !== '', { message: 'First Name is required' }),
    lastName: string().refine((value) => value.trim() !== '', { message: 'Last Name is required' }),
    email: string().email({ message: 'Invalid email address' }).refine((value) => value.trim() !== '', { message: 'Email is required' }),
    creditCard: string()
      .refine((value) => value.replace(/[^0-9]/g, '').length === 16, {
        message: 'Credit Card must have 16 digits',
      })
      .refine((value) => value.trim() !== '', { message: 'Credit Card is required' }),
    expirationMonth: number().min(1).max(12).refine((value) => value !== '', { message: 'Expiration Month is required' }),
    expirationYear: number().min(new Date().getFullYear()).max(new Date().getFullYear() + 12).refine((value) => value !== '', { message: 'Expiration Year is required' }),
  });
  

const initialValues = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};

const creditCardMask = '9999-9999-9999-9999 CSV 999';

const CheckoutForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="firstName"
            control={control}
            defaultValue={initialValues.firstName}
            render={({ field }) => (
              <TextField {...field} label="First Name" fullWidth error={!!errors.firstName} helperText={errors.firstName?.message} />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="lastName"
            control={control}
            defaultValue={initialValues.lastName}
            render={({ field }) => (
              <TextField {...field} label="Last Name" fullWidth error={!!errors.lastName} helperText={errors.lastName?.message} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            defaultValue={initialValues.email}
            render={({ field }) => (
              <TextField {...field} label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="creditCard"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputMask mask={creditCardMask} value={field.value} onChange={(e) => field.onChange(e.target.value)}>
                {(inputProps) => (
                  <TextField {...inputProps} label="Credit Card" fullWidth error={!!errors.creditCard} helperText={errors.creditCard?.message} />
                )}
              </InputMask>
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth required>
            <InputLabel>Expiration Month</InputLabel>
            <Controller
              name="expirationMonth"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field}>
                  {[...Array(12)].map((_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth required>
            <InputLabel>Expiration Year</InputLabel>
            <Controller
              name="expirationYear"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field}>
                  {[...Array(13)].map((_, index) => (
                    <MenuItem key={index} value={new Date().getFullYear() + index}>
                      {new Date().getFullYear() + index}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <button type="submit">Submit</button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CheckoutForm;
