
import axios from 'axios';

const API_URL = 'https://run.mocky.io/v3/bf8d3072-fe67-45a5-a6a7-6bd47b3b6aa8'; 

export const fetchPipelineData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('api called');
    return response.data;
    
  } catch (error) {
    console.error('Error fetching pipeline data:', error);
    throw error;
  }
};
