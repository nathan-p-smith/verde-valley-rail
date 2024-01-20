import { Box, Typography } from "@mui/material";

type ErrorMessageProps = {
  condition: boolean;
  message: string | null | undefined;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ condition, message }) => {
  return (
    <>
      {condition ? (
        <Box marginY={1}>
          <Typography className="error-text">{message}</Typography>
        </Box>
      ) : null}
    </>
  );
};

export default ErrorMessage;
