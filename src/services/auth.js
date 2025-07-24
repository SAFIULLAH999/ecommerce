const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AuthService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/auth`;
  }

  // Helper method for making API requests
  async makeRequest(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      defaultOptions.headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      ...defaultOptions,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);

      // If backend is not available, fall back to demo mode
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        console.warn('Backend not available, using demo mode');
        return this.simulateApiResponse(url, options);
      }

      throw error;
    }
  }

  // Simulate API responses when backend is not available
  simulateApiResponse(url, options) {
    const method = options.method || 'GET';

    if (url.includes('/signup') && method === 'POST') {
      const userData = JSON.parse(options.body);
      const mockUser = {
        id: 'demo_' + Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'SALES_REP',
        isEmailVerified: false,
        createdAt: new Date().toISOString()
      };
      const mockToken = 'demo_token_' + Date.now();

      return {
        success: true,
        message: 'Demo account created successfully',
        data: { user: mockUser, token: mockToken }
      };
    }

    if (url.includes('/signin') && method === 'POST') {
      const credentials = JSON.parse(options.body);
      const mockUser = {
        id: 'demo_' + Date.now(),
        email: credentials.email,
        firstName: 'Demo',
        lastName: 'User',
        role: 'SALES_REP',
        isEmailVerified: true,
        lastLoginAt: new Date().toISOString()
      };
      const mockToken = 'demo_token_' + Date.now();

      return {
        success: true,
        message: 'Demo signin successful',
        data: { user: mockUser, token: mockToken }
      };
    }

    if (url.includes('/me') && method === 'GET') {
      const mockUser = {
        id: 'demo_user',
        email: 'demo@example.com',
        firstName: 'Demo',
        lastName: 'User',
        role: 'SALES_REP',
        isEmailVerified: true,
        profileImage: null,
        lastLoginAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return {
        success: true,
        data: { user: mockUser }
      };
    }

    return {
      success: true,
      message: 'Demo operation completed'
    };
  }

  // Sign up a new user
  async signup(userData) {
    const response = await this.makeRequest(`${this.baseURL}/signup`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data.token) {
      this.setToken(response.data.token);
      this.setUser(response.data.user);
    }

    return response;
  }

  // Sign in existing user
  async signin(credentials) {
    const response = await this.makeRequest(`${this.baseURL}/signin`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data.token) {
      this.setToken(response.data.token);
      this.setUser(response.data.user);
    }

    return response;
  }

  // Get current user profile
  async getCurrentUser() {
    const response = await this.makeRequest(`${this.baseURL}/me`);
    
    if (response.success) {
      this.setUser(response.data.user);
    }

    return response;
  }

  // Logout user
  async logout() {
    try {
      await this.makeRequest(`${this.baseURL}/logout`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage regardless of API call success
      this.clearAuth();
    }
  }

  // Token management
  setToken(token) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  removeToken() {
    localStorage.removeItem('authToken');
  }

  // User data management
  setUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  removeUser() {
    localStorage.removeItem('currentUser');
  }

  // Clear all auth data
  clearAuth() {
    this.removeToken();
    this.removeUser();
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Check if token is expired (basic check)
  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  // Auto-logout if token is expired
  checkTokenExpiry() {
    if (this.isTokenExpired()) {
      this.clearAuth();
      return false;
    }
    return true;
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
