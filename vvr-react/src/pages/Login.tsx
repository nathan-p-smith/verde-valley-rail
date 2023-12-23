import { react } from "react";
import api from "../services/Api";
import * as Mui from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";


const Login = () => {

    const { setCustomer } = useAuth();

    const onLogin = async (jwt:string) => {
        console.log(jwt);

        localStorage.setItem("vv-customer-jwt", jwt);

        var customer = (await api.getCustomer()).data;
        setCustomer(customer);
    };



    return (
        <div>
            <LoginForm onLogin={onLogin}></LoginForm>
        </div>

    )

}

export default Login;