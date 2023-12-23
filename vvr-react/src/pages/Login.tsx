import { react } from "react";
import api from "../services/Api";
import * as Mui from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegistrationForm from '../components/RegistrationForm';
import { useAuth } from "../context/AuthContext";


const Login = () => {

    const { setCustomer } = useAuth();

    const setCustomerState = async (jwt:string) => {
        console.log(jwt);

        localStorage.setItem("vv-customer-jwt", jwt);

        var customer = (await api.getCustomer()).data;
        setCustomer(customer);
    };

    return (
        <div>
            <div>
                <LoginForm onLogin={setCustomerState}></LoginForm>
            </div>
            <div>
                <RegistrationForm onRegistration={setCustomerState}></RegistrationForm>
            </div>
        </div>
    )

}

export default Login;