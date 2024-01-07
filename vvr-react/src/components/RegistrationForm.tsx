import { CustomerCreate } from "../customTypes/CustomerCreate";
import { ReactNode, useState } from "react";
import api from "../services/Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string, object, number, ZodError, ZodString } from "zod";
import InputMask from "react-input-mask";
import { Controller, useForm } from "react-hook-form";
import { Button, Grid, TextField, debounce } from "@mui/material";
import myDebounce from "../helpers/Debounce";

const REQUIRED_PASSWORD_LENGTH = 8;

const checkIfEmailExists = myDebounce(async (email) => {
  var emailExists = (await api.customerEmailExists(email)).data;
  return emailExists;
}, 500);

const schema = object({
  firstName: z.string().min(1, { message: "First Name is required." }),
  lastName: z.string().min(1, { message: "Last Name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "You must enter a valid email" })
    .refine(
      async (email) => {
        if (!email) return true;

        var emailExists = await checkIfEmailExists(email);
        return !emailExists;
      },
      { message: "The email you have entered has already been registered." }
    ),
  phone: z.string().min(14, { message: "Phone is required." }),
  password: z.string().min(REQUIRED_PASSWORD_LENGTH, {
    message: `Password is required and must be at least ${REQUIRED_PASSWORD_LENGTH} characters`,
  }),
  passwordConfirm: z
    .string()
    .min(1, { message: "You must confirm your password." }),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

type RegistrationFormSchema = z.infer<typeof schema>;

type RegistrationFormProps = {
  onRegistration: (jwt: string) => void;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onRegistration,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const handleRegistration = async (formData: RegistrationFormSchema) => {
    try {
      var customerCreate: CustomerCreate = {
        ...formData,
      };

      var jwt = (await api.createCustomer(customerCreate)).data;
      onRegistration(jwt);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </div>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </div>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputMask
                mask="(999) 999-9999"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    label="Phone"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              </InputMask>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                {...field}
                label="Password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                {...field}
                label="Confirm Password"
                fullWidth
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth="xs" variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegistrationForm;
