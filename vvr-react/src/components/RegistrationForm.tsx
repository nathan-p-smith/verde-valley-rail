import * as Mui from "@mui/material";
import { CustomerCreate } from "../types/CustomerCreate";
import { useState } from "react";
import api from "../services/Api";


type RegistrationFormProps = {    
    onRegistration: (jwt:string) => void;
}

const RegistrationForm : React.FC<RegistrationFormProps> = ({ onRegistration }) => {

    

    const [customerCreate, setCustomerCreate] = useState<CustomerCreate>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Extract the name and value from the event target
        const { name, value } = e.target;

        // Update the form data using the spread operator
        setCustomerCreate((prevCustomer: CustomerCreate) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

    const handleRegistration = async () => {

        try
        {
            var jwt = (await api.createCustomer(customerCreate)).data;
            onRegistration(jwt);
        }
        catch(e)
        {
            console.log(e);
        }


    }

    return (
        <div>
            <div>
                <Mui.TextField name="firstName" placeholder="First Name" onChange={handleChange} />
            </div>
            <div>
                <Mui.TextField name="lastName" placeholder="Last Name" onChange={handleChange} />
            </div>
            <div>
                <Mui.TextField name="email" placeholder="Email" onChange={handleChange} />
            </div>
            <div>
                <Mui.TextField name="phone" placeholder="Phone" onChange={handleChange} />
            </div>
            <div>
                <Mui.TextField name="password" placeholder="Password" onChange={handleChange} />
            </div>
            <div>
                <Mui.Button onClick={handleRegistration}>Register</Mui.Button>
            </div>
        </div>
    )

}

export default RegistrationForm;