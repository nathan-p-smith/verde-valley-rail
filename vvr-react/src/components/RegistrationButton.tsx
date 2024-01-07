import { ReactNode, useState } from "react";
import { AuthenticateRequest } from "../customTypes/AuthenticateRequest";
import api from "../services/Api";
import RegistrationForm from "./RegistrationForm";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

type RegistrationButtonProps = {
  onRegistration: (jwt: string) => void;
  children: ReactNode | undefined;
};

const RegistrationButton: React.FC<RegistrationButtonProps> = ({
  onRegistration,
  children,
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
      {children ? (
        <span onClick={handleRegisterClick}>{children}</span>
      ) : (
        <Button variant="contained" onClick={handleRegisterClick}>
          Register
        </Button>
      )}
      <Dialog
        maxWidth="xs"
        open={modalVisible}
        onClose={handleModalClose}
        scroll="paper"
      >
        <DialogTitle id="scroll-dialog-title">Register</DialogTitle>
        <DialogContent>
          <RegistrationForm onRegistration={handleRegistration} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrationButton;
