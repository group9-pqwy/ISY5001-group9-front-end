import React, { useState } from 'react';
import '../styles/CarList.css'; // 引入CSS文件

const CarList = ({ cars, loading }) => {
  const [expandedCarIds, setExpandedCarIds] = useState([]); // 允许多个ID展开

  // 切换展开和收起状态
  const toggleExpand = (carId) => {
    if (expandedCarIds.includes(carId)) {
      setExpandedCarIds(expandedCarIds.filter(id => id !== carId)); // 收起已经展开的项
    } else {
      setExpandedCarIds([...expandedCarIds, carId]); // 展开新点击的项
    }
  };

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
            <div onClick={() => toggleExpand(car.carId)}>
              <span className="dot"></span>
              <span>{car.make} {car.model}</span>
              <span> - ${car.sellingprice}</span>
            </div>
            {expandedCarIds.includes(car.carId) && ( // 判断每个列表项是否在展开列表中
              <div className="car-details-container">
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
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
