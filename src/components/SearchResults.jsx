import './SearchResults.css';

const SearchResults = ({ results, totalResults, isLoading, error }) => {
  if (isLoading) {
    return <div className="loading">正在搜索，请稍候...</div>;
  }

  if (error) {
    return <div className="error">搜索出错: {error.message || '未知错误'}</div>;
  }

  if (!results || !Array.isArray(results) || results.length === 0) {
    return <div className="no-results">没有找到相关内容</div>;
  }

  // Function to safely render content based on the API response format
  const renderContent = (item) => {
    return (
      <div className="result-item">
        <h3 className="bold-title">{item.title || '无标题'}</h3>

        <div className="metadata">
          {item.type && (
            <div className="metadata-item">
              <span className="metadata-label">类型:</span> {item.type}
            </div>
          )}

          {item.type_subcat && (
            <div className="metadata-item">
              <span className="metadata-label">子类型:</span> {item.type_subcat}
            </div>
          )}

          {item.similarity_score && (
            <div className="metadata-item bold-similarity">
              <span className="metadata-label">相关度:</span> {(item.similarity_score * 100).toFixed(2)}%
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="search-results">
      <h2>搜索结果 ({totalResults} 条)</h2>
      <div className="results-list">
        {results.map((item, index) => (
          <div key={index} className="result-wrapper">
            {renderContent(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
