import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = ({
  make, setMake,
  type, setType,
  color, setColor,
  model, setModel,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  trim, setTrim,
  body, setBody,
  transmission, setTransmission,
  vin, setVin,
  state, setState,
  condition, setCondition,
  odometer, setOdometer,
  interior, setInterior,
  seller, setSeller,
  mmr, setMmr,
  setCars, onSearch
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const params = {
      make, type, color, model, minPrice, maxPrice,
      trim, body, transmission, vin, state, condition,
      odometer, interior, seller, mmr
    };

    try {
      const response = await axios.get('http://localhost:8080/api/recommend', { params });
      if (response.data.length === 0) {
        setError('No cars found with the specified criteria.');
      } else {
        setCars(response.data);  // 更新汽车列表
        if (onSearch) {
          onSearch();
        }
      }
    } catch (err) {
      setError('Error fetching car data.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
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
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Get Recommendations'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default SearchForm;
