import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegistrationButton from "../components/RegistrationButton";
import { useAuth } from "../context/AuthContext";
import api from "../services/Api";

const Login = () => {
  const { setCustomer } = useAuth();

  const navigateTo = useNavigate();

  const setCustomerState = async (jwt: string) => {
    console.log(jwt);

    localStorage.setItem("vv-customer-jwt", jwt);

    var customer = (await api.getCustomer()).data;
    setCustomer(customer);
    navigateTo("/checkout");
  };

  return (
    <Container maxWidth="xs">
      <Card>
        <CardContent>
          <Typography variant="h1" className="page-header">
            Login
          </Typography>
          <Box mb={2}>
            <LoginForm onLogin={setCustomerState}></LoginForm>
          </Box>
          <Box mb={3}>
            <Divider />
          </Box>
          <Box mb={2} textAlign="center">
            <RegistrationButton onRegistration={setCustomerState}>
              <Typography>
                <Box mb={2}>Don't have an account yet?</Box>
                <Button variant="outlined">Sign Up</Button>
              </Typography>
            </RegistrationButton>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
