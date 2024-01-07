import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  MenuItem,
  Grid,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { z, string, object, number, ZodError } from "zod";
import InputMask from "react-input-mask";
import NumericInput from "./NumericInput";
import { Customer } from "../customTypes/Customer";

const schema = object({
  firstName: z.string().min(1, { message: "First Name is required." }),
  lastName: z.string().min(1, { message: "Last Name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "You must enter a valid email" }),
  creditCard: z.string().min(1, { message: "Credit Card is required." }),
  cardExpirationDate: z
    .string()
    .min(7, { message: "Expiration Date is required." })
    .refine(
      (exp) => {
        if (exp.replace(/[^0-9]/g, "").length != 4) return true; //Don't evaluate if input isn't complete.

        try {
          var date = parseMonthYearDate(exp);
          console.log(date);

          if (date <= new Date()) return false;
        } catch (e) {
          return false;
        }

        return true;
      },
      {
        message: "Expiration date must be a valid future date.",
      }
    ),
  cardCvc: z.string().min(3, { message: "CVC is required." }),
});

type CheckoutFormSchema = z.infer<typeof schema>;

const creditCardMask = "9999-9999-9999-9999";

const parseMonthYearDate = (input: string) => {
  input = input.replace(/\s/g, "");

  var parts = input.split("/");
  var month = parseInt(parts[0]);

  if (month < 1 || month > 12) {
    throw "Invalid month value.";
  }

  var year = parseInt(`20${parts[1]}`);
  console.log(year);

  return new Date(year, month - 1, 1);
};

export type CheckoutFormProps = {
  customer: Customer;
  onSubmit: (formData: CheckoutFormSchema) => void;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ customer, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: { ...customer },
  });

  const handleFormSubmit = (formData: CheckoutFormSchema) => {
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            name="creditCard"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputMask
                mask="9999-9999-9999-9999"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    label="Credit Card"
                    fullWidth
                    error={!!errors.creditCard}
                    helperText={errors.creditCard?.message}
                  />
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
              <InputMask
                mask="99 / 99"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    label="Expiration Date (MM / YY)"
                    fullWidth
                    error={!!errors.cardExpirationDate}
                    helperText={errors.cardExpirationDate?.message}
                  />
                )}
              </InputMask>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="cardCvc"
            control={control}
            defaultValue={customer.cardCvc}
            render={({ field }) => (
              <NumericInput
                {...field}
                maxLength={4}
                label="CVC"
                error={!!errors.cardCvc}
                helperText={errors.cardCvc?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" color="primary">
            Pay Now
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CheckoutForm;
