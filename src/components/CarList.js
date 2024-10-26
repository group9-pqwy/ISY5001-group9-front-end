import React, { useState, useEffect } from 'react';
import '../styles/CarList.css'; // 引入CSS文件
import axios from 'axios'; // 用于请求图片API

const CarList = ({ cars, loading }) => {
  const [expandedCarIds, setExpandedCarIds] = useState([]); // 允许多个ID展开
  const [carImages, setCarImages] = useState({}); // 存储汽车图片链接

  // 切换展开和收起状态
  const toggleExpand = (carId) => {
    if (expandedCarIds.includes(carId)) {
      setExpandedCarIds(expandedCarIds.filter(id => id !== carId)); // 收起已经展开的项
    } else {
      setExpandedCarIds([...expandedCarIds, carId]); // 展开新点击的项
    }
  };

  // 调用Google Custom Search API获取汽车图片
  const fetchCarImage = async (car) => {
    try {
      // 设置 API key 和 cx (Custom Search Engine ID)
      const apiKey = '';
      const cx = '';  // 自定义搜索引擎 ID
  
      // 调用Google Custom Search API，使用更多详细信息进行搜索
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          q: `${car.make} ${car.model} ${car.trim} ${car.body} ${car.color} car`,  // 搜索关键词，包括品牌、型号、饰件、车身类型和颜色
          searchType: 'image',  // 只搜索图片
          cx: cx,  // 自定义搜索引擎 ID
          key: apiKey,  // API key
          num: 1,  // 获取一张图片
        }
      });
  
      // 检查响应结果
      if (response.data.items && response.data.items.length > 0) {
        return response.data.items[0].link;  // 返回第一张图片的 URL
      } else {
        return 'https://via.placeholder.com/150';  // 如果未找到图片，返回占位图片
      }
    } catch (error) {
      console.error("Error fetching car image:", error);
      return 'https://via.placeholder.com/150';  // 如果出错，返回占位图片
    }
  };
  

// 每当汽车列表更新时，获取所有汽车的图片
useEffect(() => {
  const fetchImages = async () => {
    const images = {};
    for (let car of cars) {
      images[car.carId] = await fetchCarImage(car);
    }
    setCarImages(images);
  };

  if (cars.length > 0) {
    fetchImages();
  }
}, [cars]);


  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading cars...</p>
      </div>
    );
  }

  if (cars.length === 0) {
    return <p>No cars found with the specified criteria.</p>;
  }

  return (
    <div className="car-list-container">
      <h1>Recommended Cars</h1>
      <ul className="car-list">
        {cars.map((car) => (
          <li key={car.carId} className="car-list-item">
            <div className="car-summary" onClick={() => toggleExpand(car.carId)}>
              <span className="dot"></span>
              <span className="car-title">{car.make} {car.model}</span>
              <span className='car-price'> - ${car.sellingprice}</span>
            </div>
            {expandedCarIds.includes(car.carId) && (
              <div className="car-details-wrapper">
                <div className="car-image-container">
                  <img 
                    className="car-image" 
                    src={carImages[car.carId] || 'https://via.placeholder.com/150'} 
                    alt={`${car.make} ${car.model}`} 
                  />
                </div>
                <div className="car-details-container">
                  <div className="car-details">
                    <p><strong>Year:</strong> {car.year}</p>
                    <p><strong>Make:</strong> {car.make}</p>
                    <p><strong>Model:</strong> {car.model}</p>
                    <p><strong>Trim:</strong> {car.trim}</p>
                    <p><strong>Body:</strong> {car.body}</p>
                    <p><strong>Transmission:</strong> {car.transmission}</p>
                    <p><strong>VIN:</strong> {car.vin}</p>
                    <p><strong>State:</strong> {car.state}</p>
                    <p><strong>Condition:</strong> {car.condition}</p>
                    <p><strong>Odometer:</strong> {car.odometer}</p>
                    <p><strong>Color:</strong> {car.color}</p>
                    <p><strong>Interior:</strong> {car.interior}</p>
                    <p><strong>Seller:</strong> {car.seller}</p>
                    <p><strong>MMR:</strong> {car.mmr}</p>
                    <p><strong>Selling Price:</strong> ${car.sellingprice}</p>
                    <p><strong>Sale Month:</strong> {car.sale_month}</p>
                    <p><strong>Sale Year:</strong> {car.sale_year}</p>
                    <p><strong>Car Age:</strong> {car.car_age} years</p>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
