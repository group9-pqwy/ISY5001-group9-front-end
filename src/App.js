import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import {AuthProvider} from "./utils/AuthContext";

function App() {
  return (
      <AuthProvider>
      <Router>
        <Routes>
          {/* 主页面路径 */}
          <Route path="/" element={<Home />} />
          {/* 推荐页面路径 */}
          <Route path="/searchPage" element={<SearchPage />} />
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;
