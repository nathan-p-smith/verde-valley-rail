import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Customer } from "../customTypes/Customer";

// Define the shape of the context
interface AuthContextProps {
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  isLoggedIn: boolean;
}

// Create a context with initial values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (customer) setIsLoggedIn(true);
    return;

    setIsLoggedIn(false);
  }, [customer]);

  const contextValue: AuthContextProps = {
    customer,
    setCustomer,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to consume the AuthContext
const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
