import axios from 'axios';

// API base URL - using proxy to avoid CORS issues
const API_BASE_URL = '/api/admin-zhm/searchApi';

// Fixed parameters
const APP_SOURCE = 1;
const SIGN = '08693701514526fafa989fd80ea073a4';

/**
 * Search for meditation content
 * @param {string} query - The search query
 * @returns {Promise} - The search results
 */
export const searchMeditation = async (query) => {
  try {
    console.log('Searching for:', query);

    // Create the URL with parameters
    const url = `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&app_source=${APP_SOURCE}&sign=${SIGN}`;
    console.log('Request URL:', url);

    // Add CORS handling
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('API Response:', response.data);

    // Check if the response has the expected structure
    if (response.data && response.data.code === 200) {
      return response.data;
    } else {
      console.warn('Unexpected API response format:', response.data);
      return { data: [] };
    }
  } catch (error) {
    console.error('Error searching meditation content:', error);
    throw error;
  }
};
