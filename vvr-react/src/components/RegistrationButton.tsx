import { useState } from "react";
import { AuthenticateRequest } from "../types/AuthenticateRequest";
import api from "../services/Api";
import RegistrationForm from "./RegistrationForm";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

type RegistrationButtonProps = {
  onRegistration: (jwt: string) => void;
};

const RegistrationButton: React.FC<RegistrationButtonProps> = ({
  onRegistration,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegistration = (jwt: string) => {
    onRegistration(jwt);
    setModalVisible(false);
  };

  const handleRegisterClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button onClick={handleRegisterClick}>Register</Button>
      <Dialog open={modalVisible} onClose={handleModalClose} scroll="paper">
        <DialogTitle id="scroll-dialog-title">Sign In</DialogTitle>
        <DialogContent>
          <RegistrationForm onRegistration={handleRegistration} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrationButton;
