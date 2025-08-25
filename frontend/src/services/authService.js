import axios_client from '../utils/axiosconfigure.jsx';

class AuthService {
  // Logout user
  static async logout() {
    try {
      const response = await axios_client.post('/api/v1/auth/logout');
      
      // Clear local storage
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      
      return response.data;
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if the API call fails, clear local storage
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      throw error;
    }
  }

  // Get current user info
  static getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get user role
  static getUserRole() {
    return localStorage.getItem('role');
  }

  // Check if user is authenticated
  static isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }
}

export default AuthService;
