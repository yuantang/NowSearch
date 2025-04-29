import axios from 'axios';
import mockData from '../mockData/searchResults.json';

// API base URL - using proxy to avoid CORS issues
const API_BASE_URL = '/api/admin-zhm/searchApi';

// Fixed parameters
const APP_SOURCE = 1;
const SIGN = '08693701514526fafa989fd80ea073a4';

// Determine if we should use mock data (for development)
const USE_MOCK_DATA = true; // Set to false to use the real API

/**
 * Search for meditation content
 * @param {string} query - The search query
 * @returns {Promise} - The search results
 */
export const searchMeditation = async (query) => {
  try {
    console.log('Searching for:', query);

    // If using mock data, return it directly
    if (USE_MOCK_DATA) {
      console.log('Using mock data for search');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter mock data based on query if needed
      if (query && query.trim() !== '') {
        const filteredList = mockData.data.list.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );

        return {
          ...mockData,
          data: {
            ...mockData.data,
            total: filteredList.length,
            list: filteredList
          }
        };
      }

      return mockData;
    }

    // Create the URL with parameters for real API
    const url = `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&app_source=${APP_SOURCE}&sign=${SIGN}`;
    console.log('Request URL:', url);

    // Add CORS handling and authentication headers
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Bearer ' + SIGN, // Try using the SIGN as a bearer token
        'Origin': window.location.origin
      },
      withCredentials: true // Include cookies if they exist
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

    // If API call fails, use mock data as fallback
    console.log('Using mock data as fallback due to API error');
    return mockData;
  }
};
