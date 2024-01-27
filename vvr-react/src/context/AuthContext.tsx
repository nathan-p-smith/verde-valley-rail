import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Customer } from "../types/Customer";
import shoppingCartService from "@/services/ShoppingCartService";

interface AuthContextProps {
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  isLoggedIn: boolean;
  totalCartItems: number | null;
  setTotalCartItems: (total: number) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [totalCartItems, setTotalCartItems] = useState(0);

  useEffect(() => {
    setTotalCartItems(shoppingCartService.getCart().length);

    if (customer) setIsLoggedIn(true);
    return;

    setIsLoggedIn(false);
  }, [customer]);

  const contextValue: AuthContextProps = {
    customer,
    setCustomer,
    isLoggedIn,
    totalCartItems,
    setTotalCartItems,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
