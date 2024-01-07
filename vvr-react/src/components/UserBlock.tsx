import LoginButton from "./LoginButton";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import api from "../services/Api";
import UserMenu from "./UserMenu";
import { Box } from "@mui/material";
import RegistrationButton from "./RegistrationButton";

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
    <>
      {customer ? (
        <UserMenu />
      ) : (
        <Box>
          <RegistrationButton onRegistration={onLogin}></RegistrationButton>
          | <LoginButton onLogin={onLogin} />
        </Box>
      )}
    </>
  );
};

export default UserBlock;
