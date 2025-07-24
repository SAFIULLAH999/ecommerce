import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      
      // Check if token exists and is not expired
      if (!authService.checkTokenExpiry()) {
        setIsLoading(false);
        return;
      }

      // If token exists, try to get current user
      if (authService.isAuthenticated()) {
        const response = await authService.getCurrentUser();
        if (response.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          // If API call fails, clear auth
          authService.clearAuth();
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      authService.clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.signup(userData);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signin = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authService.signin(credentials);
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      console.error('Signin failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    authService.setUser(userData);
  };

  // Auto-logout on token expiry
  useEffect(() => {
    const checkTokenInterval = setInterval(() => {
      if (isAuthenticated && !authService.checkTokenExpiry()) {
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkTokenInterval);
  }, [isAuthenticated]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    signup,
    signin,
    logout,
    updateUser,
    initializeAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
