import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { searchMeditation } from './services/api';

function App() {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await searchMeditation(query);
      console.log('Search response:', response);

      // Check if the response has the expected structure
      if (response && response.code === 200) {
        if (response.data && response.data.list) {
          // The API returns a data object with a list property containing the results
          setResults(response.data.list);
          // Set the total number of results
          setTotalResults(response.data.total || 0);
        } else if (response.data) {
          // Fallback if list is not present but data exists
          setResults([]);
          setTotalResults(0);
        } else {
          // If no data, set empty array
          setResults([]);
          setTotalResults(0);
        }
      } else {
        // If unexpected format, set empty array
        console.warn('Unexpected API response format:', response);
        setResults([]);
        setTotalResults(0);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err);
      setResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      {hasSearched && (
        <SearchResults
          results={results}
          totalResults={totalResults}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  )
}

export default App
