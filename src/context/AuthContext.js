import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // On mount, hydrate from localStorage and verify with backend
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const hasAuth = authService.isAuthenticated() && authService.checkTokenExpiry();
        if (hasAuth) {
          const resp = await authService.getCurrentUser();
          if (resp?.success && resp.data?.user) {
            setUser(resp.data.user);
          } else {
            authService.clearAuth();
          }
        }
      } catch (e) {
        console.error('Auth bootstrap failed', e);
        authService.clearAuth();
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const resp = await authService.signin({ email, password });
      if (resp?.success && resp.data?.user) {
        setUser(resp.data.user);
        return resp.data.user;
      }
      throw new Error(resp?.message || 'Login failed');
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, firstName, lastName, confirmPassword) => {
    setLoading(true);
    setError('');
    try {
      if (password !== confirmPassword) throw new Error('Passwords do not match');
      const resp = await authService.signup({ email, password, firstName, lastName });
      if (resp?.success && resp.data?.user) {
        setUser(resp.data.user);
        return resp.data.user;
      }
      throw new Error(resp?.message || 'Signup failed');
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'ADMIN'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
