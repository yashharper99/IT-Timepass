import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export const authAPI = {
  register: async (username: string, email: string, password: string, firstName: string, lastName: string, phoneNumber: string, birthDate: string) => {
    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        birthDate
      });
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default api;