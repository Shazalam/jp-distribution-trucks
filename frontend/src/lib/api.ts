import axios from 'axios';

// Create a configured Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: Fetching Quotes
export const getQuotes = async () => {
  const response = await api.get('/quotes');
  return response.data;
};

// Example: Submitting a Quote
export const submitQuote = async (data: any) => {
  const response = await api.post('/quotes', data);
  return response.data;
};

export default api;
