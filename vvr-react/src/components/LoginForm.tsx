import { useState } from "react";
import { AuthenticateRequest } from "../customTypes/AuthenticateRequest";
import api from "../services/Api";
import { z, string, object, number, ZodError, ZodString } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ErrorMessage from "../components/ErrorMessage";

type LoginFormProps = {
  onLogin: (jwt: string) => void;
};

const schema = object({
  email: z.string().min(1, { message: "Please enter your username." }),
  password: z.string().min(1, { message: "Please enter your password." }),
});

type LoginFormSchema = z.infer<typeof schema>;

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [invalidLoginMessage, setInvalidLoginMessage] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     // Extract the name and value from the event target
  //     const { name, value } = e.target;

  //     // Update the form data using the spread operator
  //     setLogin((prevLogin: AuthenticateRequest) => ({
  //       ...prevLogin,
  //       [name]: value,
  //     }));
  //   };

  const tryLogin = async (formData: LoginFormSchema) => {
    try {
      var login: AuthenticateRequest = {
        ...formData,
      };

      var jwt = (await api.authenticate(login)).data;
      onLogin(jwt);
    } catch (e) {
      setInvalidLoginMessage(
        "The username or password you entered was not correct.  Please try again."
      );
      console.log(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(tryLogin)}>
        <Grid container spacing={2}>
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
            <ErrorMessage
              condition={invalidLoginMessage}
              message={invalidLoginMessage}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
