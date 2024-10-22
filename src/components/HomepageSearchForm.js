import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Form} from "antd";

function HomepageSearchForm({ onSearch }) {
  const initialSearchData = {
    make: '',
    model: '',
    trim: '',
    body: '',
    minMileage: '',
    maxMileage: '',
    minPrice: '',
    maxPrice: '',
    minodometer: '',
    maxodometer: ''
  };

  const [searchData, setSearchData] = useState(initialSearchData);
  const navigate = useNavigate(); // 使用useNavigate来导航页面

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止默认表单提交行为

    // 校验最小和最大值
    if (Number(searchData.minPrice) > Number(searchData.maxPrice)) {
      alert('Min Price cannot be greater than Max Price.');
      setSearchData({
        ...searchData,
        minPrice: '',
        maxPrice: ''
      });
      return;
    }

    if (Number(searchData.minodometer) > Number(searchData.maxodometer)) {
      alert('Min Odometer cannot be greater than Max Odometer.');
      setSearchData({
        ...searchData,
        minodometer: '',
        maxodometer: ''
      });
      return;
    }

    // 仅提交一次搜索数据到父组件
    onSearch(searchData);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchData(initialSearchData); // 重置表单为初始状态
  };

  const handleMoreOptions = (e) => {
    e.preventDefault(); // 阻止默认链接行为
    navigate('/recommended-cars', { state: searchData }); // 跳转到推荐页面并传递当前表单数据
  };

  return (
    <Form className="search-form" onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'normal',
            justifyContent: 'space-between',
            padding: '0 20px', // 给两边留一些间距
          }}
    >
      <Form.Item>
        <h2>Find your perfect car</h2>
      </Form.Item>
     <Form.Item>
       <div className="input-row">
         <input
             type="text"
             name="make"
             placeholder="Make"
             value={searchData.make}
             onChange={handleChange}
         />
         <input
             type="text"
             name="model"
             placeholder="Model"
             value={searchData.model}
             onChange={handleChange}
         />
       </div>
     </Form.Item>
      <Form.Item>
        <div className="input-row">
          <input
              type="text"
              name="trim"
              placeholder="Trim"
              value={searchData.trim}
              onChange={handleChange}
          />
          <input
              type="text"
              name="body"
              placeholder="Body"
              value={searchData.body}
              onChange={handleChange}
          />
        </div>
      </Form.Item>
     <Form.Item>
       <div className="input-row">
         <input
             type="number"
             name="minPrice"
             placeholder="Min Price"
             value={searchData.minPrice}
             onChange={handleChange}
         />
         <input
             type="number"
             name="maxPrice"
             placeholder="Max Price"
             value={searchData.maxPrice}
             onChange={handleChange}
         />
       </div>
     </Form.Item>
      <Form.Item>
        <div className="input-row">
          <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={searchData.minPrice}
              onChange={handleChange}
          />
          <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={searchData.maxPrice}
              onChange={handleChange}
          />
        </div>
      </Form.Item>
     <Form.Item>
       <div className="input-row">
         <input
             type="number"
             name="minodometer"
             placeholder="Min Odometer"
             value={searchData.minodometer}
             onChange={handleChange}
         />
         <input
             type="number"
             name="maxodometer"
             placeholder="Max Odometer"
             value={searchData.maxodometer}
             onChange={handleChange}
         />
       </div>
     </Form.Item>
    <Form.Item>
      <button className="search-button" type="submit">Search Cars</button>
      <div className="form-links">
        <a href="#reset" onClick={handleReset}>Reset filters</a>
        <a href="#more-options" onClick={handleMoreOptions}>More options</a> {/* 保持为链接形式 */}
      </div>
    </Form.Item>
    </Form>
  );
}

export default HomepageSearchForm;
