'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuthStatus()
  }, []) // Empty dependency array is correct here

  const checkAuthStatus = async () => {
    try {
      // This would typically check for a stored token and validate it
      const token = localStorage.getItem('authToken')
      if (token) {
        // Validate token with backend
        // For now, we'll just set a mock user
        setUser({
          id: '1',
          email: 'user@example.com',
          name: 'John Doe'
        })
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // This would make an API call to your backend
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe'
      }

      setUser(mockUser)
      localStorage.setItem('authToken', 'mock-token')
    } catch (error) {
      throw new Error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // This would make an API call to your backend
      // For now, we'll simulate a successful registration
      const mockUser: User = {
        id: '1',
        email,
        name
      }

      setUser(mockUser)
      localStorage.setItem('authToken', 'mock-token')
    } catch (error) {
      throw new Error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
