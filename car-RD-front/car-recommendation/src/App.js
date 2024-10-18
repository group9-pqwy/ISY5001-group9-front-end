import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import RecommendedCarsPage from './pages/RecommendedCarsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 主页面路径 */}
        <Route path="/" element={<Homepage />} />
        {/* 推荐页面路径 */}
        <Route path="/recommended-cars" element={<RecommendedCarsPage />} />
      </Routes>
    </Router>
  );
}

export default App;


