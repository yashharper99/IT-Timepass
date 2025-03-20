// Mock API service for development
export const authAPI = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful response
    return {
      user: {
        id: 1,
        email,
        name: 'Test User'
      }
    };
  },

  register: async (username: string, email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful response
    return {
      user: {
        id: 1,
        email,
        name: username
      }
    };
  }
};