import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';

const RecommendedCarsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialState = location.state || {};

  const [make, setMake] = useState(initialState.make || '');
  const [type, setType] = useState(initialState.type || '');
  const [color, setColor] = useState(initialState.color || '');
  const [model, setModel] = useState(initialState.model || '');
  const [minPrice, setMinPrice] = useState(initialState.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialState.maxPrice || '');
  const [trim, setTrim] = useState(initialState.trim || '');
  const [body, setBody] = useState(initialState.body || '');
  const [transmission, setTransmission] = useState(initialState.transmission || '');
  const [vin, setVin] = useState(initialState.vin || '');
  const [state, setState] = useState(initialState.state || '');
  const [condition, setCondition] = useState(initialState.condition || '');
  const [odometer, setOdometer] = useState(initialState.odometer || '');
  const [interior, setInterior] = useState(initialState.interior || '');
  const [seller, setSeller] = useState(initialState.seller || '');
  const [mmr, setMmr] = useState(initialState.mmr || '');
  const [cars, setCars] = useState(initialState.cars || []);
  const [expandedCarId, setExpandedCarId] = useState(null);

  const handleBackToHome = () => {
    navigate('/');
  };

  // 切换展开状态
  const toggleExpand = (carId) => {
    if (expandedCarId === carId) {
      setExpandedCarId(null);
    } else {
      setExpandedCarId(carId);
    }
  };

  return (
    <div className="recommended-cars-page">
      {/* 搜索表单 */}
      <div className="search-form-container">
        <SearchForm
          make={make} setMake={setMake}
          type={type} setType={setType}
          color={color} setColor={setColor}
          model={model} setModel={setModel}
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          trim={trim} setTrim={setTrim}
          body={body} setBody={setBody}
          transmission={transmission} setTransmission={setTransmission}
          vin={vin} setVin={setVin}
          state={state} setState={setState}
          condition={condition} setCondition={setCondition}
          odometer={odometer} setOdometer={setOdometer}
          interior={interior} setInterior={setInterior}
          seller={seller} setSeller={setSeller}
          mmr={mmr} setMmr={setMmr}
          setCars={setCars}
        />
      </div>

      {/* 中间汽车列表 */}
      <div className="car-list-container">
        <h1>Recommended Cars</h1>
        <ul className="car-list">
          {cars.map((car) => (
            <li key={car.id} onClick={() => toggleExpand(car.id)}>
              <span>{car.make} {car.model}</span>
              <span>${car.sellingPrice}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 右侧汽车详细信息 */}
      {expandedCarId && (
        <div className={`car-details-container ${expandedCarId ? 'expanded' : ''}`}>
          {cars.filter(car => car.id === expandedCarId).map((car) => (
            <div key={car.id}>
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
              <p><strong>Selling Price:</strong> ${car.sellingPrice}</p>
              <p><strong>Sale Month:</strong> {car.saleMonth}</p>
              <p><strong>Sale Year:</strong> {car.saleYear}</p>
              <p><strong>Car Age:</strong> {car.carAge} years</p>
            </div>
          ))}
        </div>
      )}

      {/* 返回按钮 */}
      <div className="button-container">
        <button onClick={handleBackToHome} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default RecommendedCarsPage;
