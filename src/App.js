import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarRecommendation from './components/CarRecommendation';
import RecommendedCarsPage from './components/RecommendedCarsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 主页面路径 */}
        <Route path="/" element={<CarRecommendation />} />
        {/* 推荐页面路径 */}
        <Route path="/recommended-cars" element={<RecommendedCarsPage />} />
      </Routes>
    </Router>
  );
}

export default App;


