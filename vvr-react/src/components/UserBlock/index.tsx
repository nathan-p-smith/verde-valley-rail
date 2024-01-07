import LoginButton from "../LoginButton";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import api from "../../services/Api";
import UserMenu from "./UserMenu";
import { Box, Button } from "@mui/material";
import RegistrationButton from "../RegistrationButton";
import "./_user-block.scss";

const UserBlock = () => {
  const { setCustomer, customer } = useAuth();

  useEffect(() => {
    var jwt = localStorage.getItem("vv-customer-jwt");

    if (!jwt) return;

    onLogin(jwt);
  }, []);

  const onLogin = (jwt: string) => {
    localStorage.setItem("vv-customer-jwt", jwt);

    api.getCustomer().then((resp) => {
      setCustomer(resp.data);
    });
  };

  return (
    <Box className="user-block">
      {customer ? (
        <UserMenu />
      ) : (
        <Box className="user-block__sign-in">
          <RegistrationButton onRegistration={onLogin}>
            <Button>Register</Button>
          </RegistrationButton>
          |{" "}
          <LoginButton onLogin={onLogin}>
            <Button>Sign In</Button>
          </LoginButton>
        </Box>
      )}
    </Box>
  );
};

export default UserBlock;
