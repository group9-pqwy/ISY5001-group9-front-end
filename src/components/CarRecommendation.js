import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarRecommendation = () => {
  const [make, setMake] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [model, setModel] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [trim, setTrim] = useState('');
  const [body, setBody] = useState('');
  const [transmission, setTransmission] = useState('');
  const [vin, setVin] = useState('');
  const [state, setState] = useState('');
  const [condition, setCondition] = useState('');
  const [odometer, setOdometer] = useState('');
  const [interior, setInterior] = useState('');
  const [seller, setSeller] = useState('');
  const [mmr, setMmr] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 导航hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const params = {
      make,
      type,
      color,
      model,
      minPrice,
      maxPrice,
      trim,
      body,
      transmission,
      vin,
      state,
      condition,
      odometer,
      interior,
      seller,
      mmr,
    };

    try {
      const response = await axios.get('http://localhost:8080/api/recommend', { params });

      if (response.data.length === 0) {
        setError('No cars found with the specified criteria.');
      } else {
        navigate('/recommended-cars', {
          state: {
            make,
            type,
            color,
            model,
            minPrice,
            maxPrice,
            trim,
            body,
            transmission,
            vin,
            state,
            condition,
            odometer,
            interior,
            seller,
            mmr,
            cars: response.data  // 推荐的汽车列表
          },
        });
      }
    } catch (err) {
      setError('Error fetching car data.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Car Recommendation System</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Car Make:</label>
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} placeholder="Enter car make (optional)" />
        </div>
        <div>
          <label>Car Type:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Enter car type (optional)" />
        </div>
        <div>
          <label>Car Color:</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Enter car color (optional)" />
        </div>
        <div>
          <label>Car Model:</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Enter car model (optional)" />
        </div>
        <div>
          <label>Min Price:</label>
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Enter min price (optional)" />
        </div>
        <div>
          <label>Max Price:</label>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Enter max price (optional)" />
        </div>
        <div>
          <label>Trim:</label>
          <input type="text" value={trim} onChange={(e) => setTrim(e.target.value)} placeholder="Enter trim (optional)" />
        </div>
        <div>
          <label>Body:</label>
          <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Enter body type (optional)" />
        </div>
        <div>
          <label>Transmission:</label>
          <input type="text" value={transmission} onChange={(e) => setTransmission(e.target.value)} placeholder="Enter transmission (optional)" />
        </div>
        <div>
          <label>VIN:</label>
          <input type="text" value={vin} onChange={(e) => setVin(e.target.value)} placeholder="Enter VIN (optional)" />
        </div>
        <div>
          <label>State:</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter state (optional)" />
        </div>
        <div>
          <label>Condition:</label>
          <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Enter condition (optional)" />
        </div>
        <div>
          <label>Odometer:</label>
          <input type="number" value={odometer} onChange={(e) => setOdometer(e.target.value)} placeholder="Enter odometer (optional)" />
        </div>
        <div>
          <label>Interior:</label>
          <input type="text" value={interior} onChange={(e) => setInterior(e.target.value)} placeholder="Enter interior color (optional)" />
        </div>
        <div>
          <label>Seller:</label>
          <input type="text" value={seller} onChange={(e) => setSeller(e.target.value)} placeholder="Enter seller (optional)" />
        </div>
        <div>
          <label>MMR:</label>
          <input type="number" value={mmr} onChange={(e) => setMmr(e.target.value)} placeholder="Enter MMR (optional)" />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Get Recommendations'}</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CarRecommendation;
