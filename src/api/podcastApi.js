import axios from 'axios';

const baseURL = 'https://podcast-app-username.netlify.app';

export const getAllShows = async () => {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch shows');
  }
};

export const getGenreDetails = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/genre/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch genre details');
  }
};

export const getShowDetails = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/id/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch show details');
  }
};

