import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { toast } from 'sonner'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  addresses: Address[]
  orders: Order[]
  wishlist: string[]
}

export interface Address {
  id: string
  type: 'shipping' | 'billing'
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  shippingAddress: Address
  trackingNumber?: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  loginModal: boolean
  registerModal: boolean
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_LOGIN_MODAL' }
  | { type: 'TOGGLE_REGISTER_MODAL' }
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'UPDATE_ADDRESS'; payload: Address }
  | { type: 'DELETE_ADDRESS'; payload: string }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  toggleLoginModal: () => void
  toggleRegisterModal: () => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (address: Address) => void
  deleteAddress: (id: string) => void
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false
      }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        loginModal: false,
        registerModal: false
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loginModal: false,
        registerModal: false
      }

    case 'TOGGLE_LOGIN_MODAL':
      return {
        ...state,
        loginModal: !state.loginModal,
        registerModal: false
      }

    case 'TOGGLE_REGISTER_MODAL':
      return {
        ...state,
        registerModal: !state.registerModal,
        loginModal: false
      }

    case 'ADD_ADDRESS': {
      if (!state.user) return state

      const newAddress = {
        ...action.payload,
        id: Date.now().toString()
      }

      const updatedUser = {
        ...state.user,
        addresses: [...state.user.addresses, newAddress]
      }

      return {
        ...state,
        user: updatedUser
      }
    }

    case 'UPDATE_ADDRESS': {
      if (!state.user) return state

      const updatedUser = {
        ...state.user,
        addresses: state.user.addresses.map(addr =>
          addr.id === action.payload.id ? action.payload : addr
        )
      }

      return {
        ...state,
        user: updatedUser
      }
    }

    case 'DELETE_ADDRESS': {
      if (!state.user) return state

      const updatedUser = {
        ...state.user,
        addresses: state.user.addresses.filter(addr => addr.id !== action.payload)
      }

      return {
        ...state,
        user: updatedUser
      }
    }

    case 'ADD_TO_WISHLIST': {
      if (!state.user) return state

      if (state.user.wishlist.includes(action.payload)) {
        toast.info('Item already in wishlist')
        return state
      }

      const updatedUser = {
        ...state.user,
        wishlist: [...state.user.wishlist, action.payload]
      }

      toast.success('Added to wishlist')
      return {
        ...state,
        user: updatedUser
      }
    }

    case 'REMOVE_FROM_WISHLIST': {
      if (!state.user) return state

      const updatedUser = {
        ...state.user,
        wishlist: state.user.wishlist.filter(id => id !== action.payload)
      }

      toast.success('Removed from wishlist')
      return {
        ...state,
        user: updatedUser
      }
    }

    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  loginModal: false,
  registerModal: false
}

// Mock user data for demo purposes
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/api/placeholder/100/100?text=JD',
  addresses: [
    {
      id: '1',
      type: 'shipping',
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true
    }
  ],
  orders: [],
  wishlist: []
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          const user = JSON.parse(savedUser)
          dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        } else {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    checkAuth()
  }, [])

  // Save user to localStorage when user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('user')
    }
  }, [state.user])

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    if (email === 'demo@example.com' && password === 'password') {
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser })
      toast.success('Welcome back!')
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
      toast.error('Invalid email or password')
      throw new Error('Invalid credentials')
    }
  }

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock registration - in real app, this would be an API call
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      addresses: [],
      orders: [],
      wishlist: []
    }

    dispatch({ type: 'LOGIN_SUCCESS', payload: newUser })
    toast.success('Account created successfully!')
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    toast.success('Logged out successfully')
  }

  const toggleLoginModal = () => {
    dispatch({ type: 'TOGGLE_LOGIN_MODAL' })
  }

  const toggleRegisterModal = () => {
    dispatch({ type: 'TOGGLE_REGISTER_MODAL' })
  }

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const address = { ...addressData, id: Date.now().toString() }
    dispatch({ type: 'ADD_ADDRESS', payload: address })
    toast.success('Address added successfully')
  }

  const updateAddress = (address: Address) => {
    dispatch({ type: 'UPDATE_ADDRESS', payload: address })
    toast.success('Address updated successfully')
  }

  const deleteAddress = (id: string) => {
    dispatch({ type: 'DELETE_ADDRESS', payload: id })
    toast.success('Address deleted successfully')
  }

  const addToWishlist = (productId: string) => {
    if (!state.isAuthenticated) {
      toast.error('Please login to add to wishlist')
      dispatch({ type: 'TOGGLE_LOGIN_MODAL' })
      return
    }
    dispatch({ type: 'ADD_TO_WISHLIST', payload: productId })
  }

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId })
  }

  const isInWishlist = (productId: string): boolean => {
    return state.user?.wishlist.includes(productId) || false
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    toggleLoginModal,
    toggleRegisterModal,
    addAddress,
    updateAddress,
    deleteAddress,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
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
