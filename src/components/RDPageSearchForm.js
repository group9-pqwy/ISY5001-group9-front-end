import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext'; // 假设 AuthContext 存在
import '../styles/RDPageSearchForm.css';

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
  const { isLoggedIn } = useContext(AuthContext);  // 获取用户登录状态
  const token = localStorage.getItem('token');  // 获取 token

  const [expandedFields, setExpandedFields] = useState({});

  const toggleField = (field) => {
    setExpandedFields(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };
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
    
    /*
    if (!isLoggedIn) {
      alert('Please log in to submit search data.');
      return;
    }*/

    // 校验逻辑：最小价格与最大价格，最小里程与最大里程
    if (Number(minPrice) > Number( maxPrice)) {
      alert('Min Price cannot be greater than Max Price. Please check your input.');
      console.log("min:", minPrice);
      console.log("max:", maxPrice); 
      resetInvalidFields(['price']); // 重置价格字段
      return;
    }
    if (Number(minOdometer) > Number(maxOdometer)) {
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
    
      const headers = {};
      const token = localStorage.getItem('token');  // 获取本地存储中的 token
      if (token) {
        headers.Authorization = `Bearer ${token}`;  // 如果 token 存在，添加 Authorization 头部
      }
    
      // 发送带或不带 token 的请求
      const response = await axios.post('http://localhost:8080/search/recommend', params, { headers });
    
      if (response.data.length === 0) {
        alert('No cars found with the specified criteria. Please modify your search conditions.');
        resetInvalidFields(['price', 'odometer']); // 找不到结果时重置相关字段
      } else {
        setCars(response.data);  // 更新汽车列表
      }
    
    } catch (err) {
      alert('Error fetching car data. Please try again later.');
    } finally {
      setLoading(false);  // 请求完成，停止 loading
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      {/* Car Basic Information Section */}
      <div className={`field-group ${expandedFields.basicInfo ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('basicInfo')}>
          <i className="icon-car"></i> Car Basic Information
          <span className="toggle-arrow">{expandedFields.basicInfo ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              Includes specific information about each vehicle, such as its make, model, trim.
            </div>
          </span>
        </div>

        {expandedFields.basicInfo && (
          <div className="field-inputs">
            <div>
              <label>Car Make:</label>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Enter car make"
                className="field-input"
              />
            </div>
            <div>
              <label>Car Model:</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter car model"
                className="field-input"
              />
            </div>
            <div>
              <label>Trim:</label>
              <input
                type="text"
                value={trim}
                onChange={(e) => setTrim(e.target.value)}
                placeholder="Enter trim"
                className="field-input"
              />
            </div>
            <div>
              <label>Body Type:</label>
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter body type"
                className="field-input"
              />
            </div>
          </div>
        )}
      </div>

      {/* Colour Section */}
      <div className={`field-group ${expandedFields.color ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('color')}>
          <i className="icon-color"></i> Colour
          <span className="toggle-arrow">{expandedFields.color ? '▲' : '▼'}</span>
          
          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              You can input car color here!
            </div>
          </span>
        </div>
        {expandedFields.color && (
          <input 
            type="text" 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
            placeholder="Enter color" 
            className="field-input"
          />
        )}
      </div>

      {/* Interior Color Section */}
      <div className={`field-group ${expandedFields.interior ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('interior')}>
          <i className="icon-interior"></i> Interior Color
          <span className="toggle-arrow">{expandedFields.interior ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              You can input car interior color here!
            </div>
          </span>
        </div>
        {expandedFields.interior && (
          <input 
            type="text" 
            value={interior} 
            onChange={(e) => setInterior(e.target.value)} 
            placeholder="Enter interior color" 
            className="field-input"
          />
        )}
      </div>

      {/* Price Range Section */}
      <div className={`field-group ${expandedFields.price ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('price')}>
          <i className="icon-price"></i> Price Range
          <span className="toggle-arrow">{expandedFields.price ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              You can enter your price range here and we will recommend cars with good price range for you. Note that the minimum price cannot exceed the maximum price.
            </div>
          </span>
        </div>
        {expandedFields.price && (
          <div className="min-max-group">
            <input 
              type="number" 
              value={minPrice} 
              onChange={(e) => setMinPrice(e.target.value)} 
              placeholder="Min Price" 
              className="field-input"
            />
            <input 
              type="number" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(e.target.value)} 
              placeholder="Max Price" 
              className="field-input"
            />
          </div>
        )}
      </div>

      {/* Odometer Range Section */}
      <div className={`field-group ${expandedFields.odometer ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('odometer')}>
          <i className="icon-odometer"></i> Odometer Range
          <span className="toggle-arrow">{expandedFields.odometer ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              You can enter your odometer range here and we will recommend cars with good odometer range for you. Note that the minimum odometer cannot exceed the maximum odometer.
            </div>
          </span>
        </div>
        {expandedFields.odometer && (
          <div className="min-max-group">
            <input 
              type="number" 
              value={minOdometer} 
              onChange={(e) => setMinOdometer(e.target.value)} 
              placeholder="Min Odometer" 
              className="field-input"
            />
            <input 
              type="number" 
              value={maxOdometer} 
              onChange={(e) => setMaxOdometer(e.target.value)} 
              placeholder="Max Odometer" 
              className="field-input"
            />
          </div>
        )}
      </div>

      {/* Transmission Section */}
      <div className={`field-group ${expandedFields.transmission ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('transmission')}>
          <i className="icon-transmission"></i> Transmission
          <span className="toggle-arrow">{expandedFields.transmission ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              The type of transmission in the vehicle e.g., automatic.
            </div>
          </span>
        </div>
        {expandedFields.transmission && (
          <input 
            type="text" 
            value={transmission} 
            onChange={(e) => setTransmission(e.target.value)} 
            placeholder="Enter transmission type" 
            className="field-input"
          />
        )}
      </div>

      {/* VIN Section */}
      <div className={`field-group ${expandedFields.vin ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('vin')}>
          <i className="icon-vin"></i> VIN
          <span className="toggle-arrow">{expandedFields.vin ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              Vehicle Identification Number, a unique code for each vehicle.
            </div>
          </span>
        </div>
        {expandedFields.vin && (
          <input 
            type="text" 
            value={vin} 
            onChange={(e) => setVin(e.target.value)} 
            placeholder="Enter VIN" 
            className="field-input"
          />
        )}
      </div>

      {/* State Section */}
      <div className={`field-group ${expandedFields.state ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('state')}>
          <i className="icon-state"></i> State
          <span className="toggle-arrow">{expandedFields.state ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              It is the state where the vehicle is registered.
            </div>
          </span>
        </div>
        {expandedFields.state && (
          <input 
            type="text" 
            value={state} 
            onChange={(e) => setState(e.target.value)} 
            placeholder="Enter state" 
            className="field-input"
          />
        )}
      </div>

      {/* Condition Section */}
      <div className={`field-group ${expandedFields.condition ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('condition')}>
          <i className="icon-condition"></i> Condition
          <span className="toggle-arrow">{expandedFields.condition ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              It is the Condition of the vehicle. The range is from 1 to 49, the larger, the safer.
            </div>
          </span>
        </div>
        {expandedFields.condition && (
          <input 
            type="text" 
            value={condition} 
            onChange={(e) => setCondition(e.target.value)} 
            placeholder="Enter condition" 
            className="field-input"
          />
        )}
      </div>

      {/* Seller Section */}
      <div className={`field-group ${expandedFields.seller ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('seller')}>
          <i className="icon-seller"></i> Seller
          <span className="toggle-arrow">{expandedFields.seller ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              Identity of the seller.
            </div>
          </span>
        </div>
        {expandedFields.seller && (
          <input 
            type="text" 
            value={seller} 
            onChange={(e) => setSeller(e.target.value)} 
            placeholder="Enter seller" 
            className="field-input"
          />
        )}
      </div>

      {/* MMR Section */}
      <div className={`field-group ${expandedFields.mmr ? 'expanded' : ''}`}>
        <div className="field-label" onClick={() => toggleField('mmr')}>
          <i className="icon-mmr"></i> MMR
          <span className="toggle-arrow">{expandedFields.mmr ? '▲' : '▼'}</span>

          {/* 圆形提示图标 */}
          <span className="info-icon">
            ?
            <div className="tooltip-text">
              MMR values offer an estimate of the market value of each vehicle, allowing for analysis of market trends and fluctuations. You can use it as a reference price.
            </div>
          </span>
        </div>
        {expandedFields.mmr && (
          <input 
            type="number" 
            value={mmr} 
            onChange={(e) => setMmr(e.target.value)} 
            placeholder="Enter MMR" 
            className="field-input"
          />
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Get Recommendations'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default RDPageSearchForm;
