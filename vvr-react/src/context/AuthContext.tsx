import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create a context with initial values
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Create a provider component
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    // Perform authentication logic
    // For simplicity, we'll just set isLoggedIn to true
    setLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic
    // For simplicity, we'll just set isLoggedIn to false
    setLoggedIn(false);
  };

  const contextValue: AuthContextProps = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to consume the AuthContext
const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
