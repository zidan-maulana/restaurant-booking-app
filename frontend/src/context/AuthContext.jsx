/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Lazy state initialization to read from localStorage synchronously on mount
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('atma_mock_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [loading, setLoading] = useState(false);

  // Simulated login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      // Small simulated delay for premium feel
      setTimeout(() => {
        if (!email || !password) {
          setLoading(false);
          reject(new Error('Email dan password wajib diisi.'));
          return;
        }

        // Mock accounts mapping
        if (email === 'admin@atma.com' && password === 'admin') {
          const mockAdmin = {
            id: 1,
            nama: 'Admin Atma',
            email: 'admin@atma.com',
            role: 'admin',
            token: 'mock_jwt_token_admin'
          };
          setUser(mockAdmin);
          localStorage.setItem('atma_mock_user', JSON.stringify(mockAdmin));
          setLoading(false);
          resolve(mockAdmin);
        } else if (email === 'user@atma.com' && password === 'user') {
          const mockUser = {
            id: 2,
            nama: 'Budi Santoso',
            email: 'user@atma.com',
            role: 'customer',
            token: 'mock_jwt_token_customer'
          };
          setUser(mockUser);
          localStorage.setItem('atma_mock_user', JSON.stringify(mockUser));
          setLoading(false);
          resolve(mockUser);
        } else {
          // Allow other emails for dynamic registration testing, default to customer
          const mockUser = {
            id: Date.now(),
            nama: email.split('@')[0],
            email: email,
            role: 'customer',
            token: 'mock_jwt_token_customer_new'
          };
          setUser(mockUser);
          localStorage.setItem('atma_mock_user', JSON.stringify(mockUser));
          setLoading(false);
          resolve(mockUser);
        }
      }, 800);
    });
  };

  // Simulated register function
  const register = (nama, email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setTimeout(() => {
        if (!nama || !email || !password) {
          setLoading(false);
          reject(new Error('Semua kolom pendaftaran wajib diisi.'));
          return;
        }

        // Mock success
        const newUser = {
          id: Date.now(),
          nama: nama,
          email: email,
          role: 'customer',
          token: 'mock_jwt_token_customer_new'
        };
        setLoading(false);
        resolve(newUser);
      }, 800);
    });
  };

  // Simulated logout function
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

