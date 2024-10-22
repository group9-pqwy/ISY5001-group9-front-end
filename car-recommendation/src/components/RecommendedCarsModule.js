import React, { useState, useEffect } from 'react';
import RDPageSearchForm from '../components/RDPageSearchForm';
import CarList from '../components/CarList';
import axios from 'axios';
import '../styles/RecommendedCarsPage.css';
import { useLocation, useNavigate } from 'react-router-dom';

const RecommendedCarsModule = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialState = location.state || {};

    const [make, setMake] = useState(initialState.make || '');
    const [model, setModel] = useState(initialState.model || '');
    const [color, setColor] = useState(initialState.color || '');
    const [minPrice, setMinPrice] = useState(initialState.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(initialState.maxPrice || '');
    const [minOdometer, setMinOdometer] = useState(initialState.minOdometer || '');
    const [maxOdometer, setMaxOdometer] = useState(initialState.maxOdometer || '');
    const [trim, setTrim] = useState(initialState.trim || '');
    const [body, setBody] = useState(initialState.body || '');
    const [transmission, setTransmission] = useState(initialState.transmission || '');
    const [vin, setVin] = useState(initialState.vin || '');
    const [state, setState] = useState(initialState.state || '');
    const [condition, setCondition] = useState(initialState.condition || '');
    const [interior, setInterior] = useState(initialState.interior || '');
    const [seller, setSeller] = useState(initialState.seller || '');
    const [mmr, setMmr] = useState(initialState.mmr || '');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedCarIds, setExpandedCarIds] = useState([]);  // 改为数组

    useEffect(() => {
      const fetchRecommendedCars = async () => {
          setLoading(true);  // 开始加载时，设置 loading 为 true
          setError('');

          // 创建 0.5 秒延迟的 Promise
          const delay = new Promise(resolve => setTimeout(resolve, 500));

          try {
              // 发起请求，不强制需要登录
              const response = await axios.post('http://localhost:8080/api/recommend', initialState);

              // 打印收到的响应数据，帮助调试
              console.log("Received response from backend: ", response.data);

              if (response.data.length === 0) {
                  alert('No cars found with the specified criteria.');
              } else {
                  setCars(response.data);  // 更新汽车列表
              }
          } catch (error) {
              setError('Error fetching car data. Please try again later.');
          }

          // 确保 loading 状态至少持续 1 秒
          await Promise.all([delay]);

          setLoading(false);  // 请求和延迟都完成时，设置 loading 为 false
      };

        if (Object.keys(initialState).length > 0) {
            fetchRecommendedCars();  // 初始数据非空时发起请求
        }
    }, [initialState]);
    

    const handleBackToHome = () => {
        navigate('/');
    };

    // 修改 toggleExpand 函数，允许多个条目同时展开
    const toggleExpand = (carId) => {
        if (expandedCarIds.includes(carId)) {
            setExpandedCarIds(expandedCarIds.filter(id => id !== carId));  // 收起该汽车项
        } else {
            setExpandedCarIds([...expandedCarIds, carId]);  // 展开该汽车项
        }
    };

    return (
        <div className="recommended-cars-page">
            <div className="search-form-container">
                <RDPageSearchForm
                  make={make} setMake={setMake}
                  model={model} setModel={setModel}
                  color={color} setColor={setColor}
                  minPrice={minPrice} setMinPrice={setMinPrice}
                  maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                  minOdometer={minOdometer} setMinOdometer={setMinOdometer}
                  maxOdometer={maxOdometer} setMaxOdometer={setMaxOdometer}
                  trim={trim} setTrim={setTrim}
                  body={body} setBody={setBody}
                  transmission={transmission} setTransmission={setTransmission}
                  vin={vin} setVin={setVin}
                  state={state} setState={setState}
                  condition={condition} setCondition={setCondition}
                  interior={interior} setInterior={setInterior}
                  seller={seller} setSeller={setSeller}
                  mmr={mmr} setMmr={setMmr}
                  setCars={setCars}
                  setLoading={setLoading}
                />
            </div>

            {/* 将 loading 状态传递给 CarList 组件 */}
            <CarList cars={cars} toggleExpand={toggleExpand} expandedCarIds={expandedCarIds} loading={loading} />

            <div className="button-container">
              <button onClick={handleBackToHome}>
                Back to Home
              </button>
          </div>
        </div>
    );
};

export default RecommendedCarsModule;
