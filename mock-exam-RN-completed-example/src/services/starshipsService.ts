import axios from 'axios';

const api = axios.create({
  baseURL: 'https://swapi.dev/api',
  timeout: 5000, // 5 seconds
});

export const getStarships = async () => {
  try {
    const response = await api.get('/starships/');
    return response.data.results; 
  } catch (error) {
    console.error("Error fetching starships:", error);
    throw error;
  }
};
