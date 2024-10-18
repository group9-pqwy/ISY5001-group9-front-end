import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import HomepageSearchForm from '../components/HomepageSearchForm';
import '../CSS/Homepage.css';  

function Homepage() {
  const navigate = useNavigate(); 

  const handleSearch = (searchData) => {
    navigate('/recommended-cars', { state: searchData }); // 将搜索数据传递到推荐页面
  };

  return (
    <div className="homepage-container">
      <div className="top-section">
        <div className="search-section">
          <HomepageSearchForm onSearch={handleSearch} />
        </div>
      </div>

      <div className="bottom-section">
        <h2>Discover your next car!</h2>
      </div>
    </div>
  );
}

export default Homepage;
