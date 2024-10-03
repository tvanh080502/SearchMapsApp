import axios from 'axios';

const API_KEY = 'lp6g2DoLF0k7MNenpRsGbFyUWlTfHS0NCUPJVA86Hw0';
const BASE_URL = 'https://search.hereapi.com/v1/geocode';

export const searchAddress = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&apiKey=${API_KEY}`);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
};
