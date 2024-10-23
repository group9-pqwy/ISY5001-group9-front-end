import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from "antd";

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
      <Form
          className="homepage-search-form"
          onFinish={handleSubmit} // 使用 onFinish 代替 onSubmit
          layout="vertical"  // 使用 vertical 布局来让每个表单项独占一行
          style={{
            padding: '0 20px',
          }}
      >
        <h2>Find your perfect car</h2>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Make">
              <Input
                  type="text"
                  name="make"
                  placeholder="Make"
                  value={searchData.make}
                  onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Model">
              <Input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={searchData.model}
                  onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Trim">
              <Input
                  type="text"
                  name="trim"
                  placeholder="Trim"
                  value={searchData.trim}
                  onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Body">
              <Input
                  type="text"
                  name="body"
                  placeholder="Body"
                  value={searchData.body}
                  onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Min Price">
              <Input
                  type="number"
                  name="minPrice"
                  placeholder="Min Price"
                  value={searchData.minPrice}
                  onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Max Price">
              <Input
                  type="number"
                  name="maxPrice"
                  placeholder="Max Price"
                  value={searchData.maxPrice}
                  onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Min Odometer">
              <Input
                  type="number"
                  name="minodometer"
                  placeholder="Min Odometer"
                  value={searchData.minodometer}
                  onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Max Odometer">
              <Input
                  type="number"
                  name="maxodometer"
                  placeholder="Max Odometer"
                  value={searchData.maxodometer}
                  onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button className="search-button" type="primary" htmlType="submit">
            Search Cars
          </Button>
          <div className="form-links" style={{ marginTop: '10px' }}>
            <a href="#reset" onClick={handleReset}>Reset filters</a> &nbsp; | &nbsp;
            <a href="#more-options" onClick={handleMoreOptions}>More options</a>
          </div>
        </Form.Item>
      </Form>
  );
}

export default HomepageSearchForm;
