import React, { useState } from 'react';
import axios from 'axios';

const RDPageSearchForm = ({
  make, setMake,
  model, setModel,
  color, setColor,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  trim, setTrim,
  body, setBody,
  transmission, setTransmission,
  vin, setVin,
  state, setState,
  condition, setCondition,
  minOdometer, setMinOdometer,
  maxOdometer, setMaxOdometer,
  interior, setInterior,
  seller, setSeller,
  mmr, setMmr,
  setCars,
  loading,  // 接收 loading 作为 props
  setLoading  // 接收父组件传递的 setLoading 函数
}) => {
  const [error, setError] = useState('');

  // 重置无效字段的函数
  const resetInvalidFields = (fieldsToReset) => {
    if (fieldsToReset.includes('price')) {
      setMinPrice('');
      setMaxPrice('');
    }
    if (fieldsToReset.includes('odometer')) {
      setMinOdometer('');
      setMaxOdometer('');
    }
  };

  // 表单提交时的校验
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 校验逻辑：最小价格与最大价格，最小里程与最大里程
    if (minPrice > maxPrice) {
      alert('Min Price cannot be greater than Max Price. Please check your input.');
      resetInvalidFields(['price']); // 重置价格字段
      return;
    }
    if (minOdometer > maxOdometer) {
      alert('Min Odometer cannot be greater than Max Odometer. Please check your input.');
      resetInvalidFields(['odometer']); // 重置里程字段
      return;
    }

    const params = {
      make, model, color, trim, body, transmission, vin,
      state, condition, minOdometer, maxOdometer, interior, seller, mmr,
      minPrice, maxPrice
    };

    try {
      setLoading(true);  // 开始加载
      const delay = new Promise(resolve => setTimeout(resolve, 1000)); // 设置 1 秒延迟

      const response = await axios.post('http://localhost:8080/api/recommend', params);

      if (response.data.length === 0) {
        alert('No cars found with the specified criteria. Please modify your search conditions.');
        resetInvalidFields(['price', 'odometer']); // 找不到结果时重置相关字段
      } else {
        setCars(response.data);  // 更新汽车列表
      }

      // 确保 loading 至少持续 1 秒
      await delay;

    } catch (err) {
      alert('Error fetching car data. Please try again later.');
    } finally {
      setLoading(false);  // 请求完成，停止 loading
    }
  };

  // 最小值和最大值的实时输入校验逻辑
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    if (value > maxPrice) {
      alert('Min Price cannot be greater than Max Price.');
      resetInvalidFields(['price']); // 出现错误时重置价格字段
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    if (value < minPrice) {
      alert('Max Price cannot be less than Min Price.');
      resetInvalidFields(['price']); // 出现错误时重置价格字段
    }
  };

  const handleMinOdometerChange = (e) => {
    const value = Number(e.target.value);
    setMinOdometer(value);
    if (value > maxOdometer) {
      alert('Min Odometer cannot be greater than Max Odometer.');
      resetInvalidFields(['odometer']); // 出现错误时重置里程字段
    }
  };

  const handleMaxOdometerChange = (e) => {
    const value = Number(e.target.value);
    setMaxOdometer(value);
    if (value < minOdometer) {
      alert('Max Odometer cannot be less than Min Odometer.');
      resetInvalidFields(['odometer']); // 出现错误时重置里程字段
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <label>Car Make:</label>
        <input 
          type="text" 
          value={make} 
          onChange={(e) => setMake(e.target.value)} 
          placeholder="Enter car make" 
        />
      </div>
      <div>
        <label>Car Model:</label>
        <input 
          type="text" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          placeholder="Enter car model" 
        />
      </div>
      <div>
        <label>Trim:</label>
        <input 
          type="text" 
          value={trim} 
          onChange={(e) => setTrim(e.target.value)} 
          placeholder="Enter trim" 
        />
      </div>
      <div>
        <label>Body Type:</label>
        <input 
          type="text" 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
          placeholder="Enter body type" 
        />
      </div>
      <div>
        <label>Car Color:</label>
        <input 
          type="text" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          placeholder="Enter car color" 
        />
      </div>
      
      {/* 价格输入框 */}
      <div className="min-max-group">
        <div>
          <label>Min Price:</label>
          <input 
            type="number" 
            value={minPrice} 
            onChange={handleMinPriceChange} 
            placeholder="Min Price" 
          />
        </div>
        <div>
          <label>Max Price:</label>
          <input 
            type="number" 
            value={maxPrice} 
            onChange={handleMaxPriceChange} 
            placeholder="Max Price" 
          />
        </div>
      </div>

      {/* 里程数输入框 */}
      <div className="min-max-group">
        <div>
          <label>Min Odometer:</label>
          <input 
            type="number" 
            value={minOdometer} 
            onChange={handleMinOdometerChange} 
            placeholder="Min Odometer" 
          />
        </div>
        <div>
          <label>Max Odometer:</label>
          <input 
            type="number" 
            value={maxOdometer} 
            onChange={handleMaxOdometerChange} 
            placeholder="Max Odometer" 
          />
        </div>
      </div>
      
      <div>
        <label>Transmission:</label>
        <input 
          type="text" 
          value={transmission} 
          onChange={(e) => setTransmission(e.target.value)} 
          placeholder="Enter transmission" 
        />
      </div>
      <div>
        <label>VIN:</label>
        <input 
          type="text" 
          value={vin} 
          onChange={(e) => setVin(e.target.value)} 
          placeholder="Enter VIN" 
        />
      </div>
      <div>
        <label>State:</label>
        <input 
          type="text" 
          value={state} 
          onChange={(e) => setState(e.target.value)} 
          placeholder="Enter state" 
        />
      </div>
      <div>
        <label>Condition:</label>
        <input 
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)} 
          placeholder="Enter condition" 
        />
      </div>
      <div>
        <label>Interior Color:</label>
        <input 
          type="text" 
          value={interior} 
          onChange={(e) => setInterior(e.target.value)} 
          placeholder="Enter interior color" 
        />
      </div>
      <div>
        <label>Seller:</label>
        <input 
          type="text" 
          value={seller} 
          onChange={(e) => setSeller(e.target.value)} 
          placeholder="Enter seller" 
        />
      </div>
      <div>
        <label>MMR:</label>
        <input 
          type="number" 
          value={mmr} 
          onChange={(e) => setMmr(e.target.value)} 
          placeholder="Enter MMR" 
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Get Recommendations'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default RDPageSearchForm;
