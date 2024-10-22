import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from "antd";

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

  const handleSubmit = () => {
    // 校验最小和最大价格
    if (Number(searchData.minPrice) > Number(searchData.maxPrice)) {
      alert('Min Price cannot be greater than Max Price.'); // 显示错误提示
      setSearchData({
        ...searchData,
        minPrice: '',
        maxPrice: ''
      });
      return;
    }

    // 校验最小和最大里程数
    if (Number(searchData.minodometer) > Number(searchData.maxodometer)) {
      alert('Min Odometer cannot be greater than Max Odometer.'); // 显示错误提示
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
    navigate('/searchPage', { state: searchData }); // 跳转到推荐页面并传递当前表单数据
  };

  return (
    <Form className="search-form" onFinish={handleSubmit} // 使用 onFinish 代替 onSubmit
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
      <button className="search-button" htmlType="submit">Search Cars</button> {/* 确保按钮类型为submit */}
      <div className="form-links">
        <a href="#reset" onClick={handleReset}>Reset filters</a>
        <a href="#more-options" onClick={handleMoreOptions}>More options</a> {/* 保持为链接形式 */}
      </div>
    </Form.Item>
    </Form>
  );
}

export default HomepageSearchForm;
