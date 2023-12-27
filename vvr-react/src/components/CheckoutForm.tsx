import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, MenuItem, Grid, Select, InputLabel, FormControl } from '@mui/material';
import { z, string, object, number } from 'zod';
import InputMask from 'react-input-mask';
import NumericInput from './NumericInput';

const schema = object({
    firstName: z.string().min(1, { message: "First Name is required."}),
    lastName: z.string().min(1, { message: "Last Name is required."}),
    email: z.string().min(1, {message: 'Email is required'}).email({message: 'You must enter a valid email'}),
    creditCard: z.string().min(1, {message: 'Credit Card is required.'}),
    cardExpirationDate: z.string().min(1, {message: 'Expiration Date is required.'}),
    cardCvc: z.string().min(1, { message: 'CVC is required.'})
  });
  
type CheckoutFormSchema = z.infer<typeof schema>;

const initialValues = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'asdf@asdf.com',
  creditCard: '',
  cardExpirationDate: '',
  cardCvc: ''
};

const creditCardMask = '9999-9999-9999-9999';

const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',    
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: CheckoutFormSchema) => {
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
              <div>
              <TextField {...field} label="First Name" fullWidth error={!!errors.firstName} helperText={errors.firstName?.message} />              
              </div>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="lastName"
            control={control}
            defaultValue={initialValues.lastName}
            render={({ field }) => (                
              <div>
              <TextField {...field} label="Last Name" fullWidth error={!!errors.lastName} helperText={errors.lastName?.message} />              
              </div>
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
        <Grid item xs={12}>
          <Controller
            name="creditCard"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputMask mask="9999-9999-9999-9999" value={field.value} onChange={(e) => field.onChange(e.target.value)}>                
                {(inputProps) => (
                  <TextField {...inputProps} label="Credit Card" fullWidth error={!!errors.creditCard} helperText={errors.creditCard?.message} />
                )}
              </InputMask>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="cardExpirationDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputMask mask="99 / 99" value={field.value} onChange={(e) => field.onChange(e.target.value)}>                
                {(inputProps) => (
                  <TextField {...inputProps} label="Expiration Date (MM / YY)" fullWidth error={!!errors.cardExpirationDate} helperText={errors.cardExpirationDate?.message} />
                )}
              </InputMask>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="cardCvc"
            control={control}
            defaultValue={initialValues.cardCvc}
            render={({ field }) => (
              <NumericInput {...field} maxLength={4} label="CVC" error={!!errors.cardCvc} helperText={errors.cardCvc?.message} />              
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <button type="submit">Submit</button>
        </Grid>                
      </Grid>
    </form>
  );
};

export default CheckoutForm;
