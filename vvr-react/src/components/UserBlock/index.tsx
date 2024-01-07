import LoginButton from "@/components/LoginButton";
import RegistrationButton from "@/components/RegistrationButton";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/Api";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import UserMenu from "./UserMenu";
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
