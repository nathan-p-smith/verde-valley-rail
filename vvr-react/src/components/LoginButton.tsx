import { ReactNode, useState } from "react";
import LoginForm from "../components/LoginForm";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

type LoginButtonProps = {
  onLogin: (jwt: string) => void;
  children: ReactNode | undefined;
};

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin, children }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = (jwt: string) => {
    onLogin(jwt);
    setModalVisible(false);
  };

  const handleLoginClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      {children ? (
        <span onClick={handleLoginClick}>{children}</span>
      ) : (
        <Button onClick={handleLoginClick}>Sign In</Button>
      )}

      <Dialog
        maxWidth="xs"
        open={modalVisible}
        onClose={handleModalClose}
        scroll="paper"
      >
        <DialogTitle id="scroll-dialog-title">Sign In</DialogTitle>
        <DialogContent>
          <LoginForm onLogin={handleLogin} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginButton;
