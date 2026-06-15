/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import * as authService from '../services/auth';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Lazy state initialization to read from localStorage synchronously on mount
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('atma_mock_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [loading, setLoading] = useState(false);

  // Real login function using auth service
  const login = async (email, password) => {
    setLoading(true);
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      localStorage.setItem('atma_mock_user', JSON.stringify(loggedInUser));
      return loggedInUser;
    } finally {
      setLoading(false);
    }
  };

  // Real register function using auth service
  const register = async (nama, email, password) => {
    setLoading(true);
    try {
      const result = await authService.register(nama, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('atma_mock_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
}

