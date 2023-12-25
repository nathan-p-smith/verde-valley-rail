import LoginButton from "./LoginButton";
import { useAuth } from '../context/AuthContext';
import { useEffect } from "react";
import api from "../services/Api";
import * as Mui from "@mui/material";
import UserMenu from "./UserMenu";

const UserBlock = () => {

    const { isLoggedIn, login, setCustomer, customer } = useAuth();

    useEffect(() => {
    
        var jwt = localStorage.getItem("vv-customer-jwt");
    
        if(!jwt)
          return;
    
        onLogin(jwt);
    
      }, []);
    
      const onLogin = (jwt:string) => {
        
        localStorage.setItem("vv-customer-jwt", jwt);
    
        login();
    
        api.getCustomer().then(resp => {
          setCustomer(resp.data);
        });
      }

    

    return (
        <>
            {customer ? <UserMenu /> : <LoginButton onLogin={onLogin} />}        
        </>        
    )
}

export default UserBlock;