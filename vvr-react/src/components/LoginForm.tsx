import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { object, z } from "zod";
import ErrorMessage from "../components/ErrorMessage";
import { AuthenticateRequest } from "../types/AuthenticateRequest";
import api from "../services/Api";

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
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const tryLogin: SubmitHandler<LoginFormSchema> = async (formData) => {
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
              condition={!!invalidLoginMessage}
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
