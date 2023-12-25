import * as Mui from "@mui/material";
import { useState } from "react";
import { AuthenticateRequest } from "../types/AuthenticateRequest";
import api from "../services/Api";
import LoginForm from "./LoginForm";

type LoginButtonProps = {    
    onLogin: (jwt:string) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleLogin = (jwt:string) => {
        onLogin(jwt);
        setModalVisible(false);
    };

    const handleLoginClick = () => {
        setModalVisible(true);
    }

    const handleModalClose = () => {
        setModalVisible(false);
    }

    return (
        <>        
        <Mui.Button onClick={handleLoginClick}>Sign In</Mui.Button>
        <Mui.Dialog open={modalVisible} onClose={handleModalClose} scroll="paper">
            <Mui.DialogTitle id="scroll-dialog-title">Sign In</Mui.DialogTitle>
            <Mui.DialogContent>                
                <LoginForm onLogin={handleLogin} />
            </Mui.DialogContent>            
        </Mui.Dialog>
        </>
    )
}


export default LoginButton;