import * as Mui from "@mui/material";
import { useState } from "react";
import { AuthenticateRequest } from "../types/AuthenticateRequest";
import api from "../services/Api";

type LoginFormProps = {    
    onLogin: (jwt:string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {

    const [login, setLogin] = useState<AuthenticateRequest>({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Extract the name and value from the event target
        const { name, value } = e.target;
    
        // Update the form data using the spread operator
        setLogin((prevLogin:AuthenticateRequest) => ({
          ...prevLogin,
          [name]: value,
        }));
    };

    const tryLogin = async () => {

        try
        {
            var resp = (await api.authenticate(login)).data;
            console.log(resp);
            onLogin(resp.jwt);
        }
        catch(e)
        {
            console.log(e);
        }

    }

    return (
        <>
            <div>
                <Mui.TextField name="email" value={login.email} onChange={handleChange} />
            </div>
            <div>
                <Mui.TextField name="password" value={login.password} onChange={handleChange} />
            </div>
            <div>
                <Mui.Button onClick={tryLogin}>Login</Mui.Button>
            </div>
        </>
    )
}

export default LoginForm;