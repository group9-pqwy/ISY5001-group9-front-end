import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Spin, Alert } from 'antd';
import axios from 'axios';

const HomaPageCarRecommendationList = () => {
    const [carData, setCarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 从 localStorage 中获取 token 并作为 username
        const username = localStorage.getItem('token') || null; // 不存在时设为 null

        // 发送请求到后端
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/home/carsList', null, {
                    params: { username } // 发送用户名作为请求参数
                });

                // 假设后端返回一个包含汽车对象的数组
                const carList = response.data;

                // 只取前 4 个汽车信息展示
                setCarData(carList.slice(0, 4));
                setLoading(false);
            } catch (err) {
                console.error('Error fetching car data:', err);
                setError('Failed to load car data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Spin tip="Loading..." />;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon />;
    }

    const handleSearch = (make, model, color) => {
        const query = `${make} ${model} ${color} car`;
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(googleSearchUrl, '_blank');
    };

    return (
        <Row gutter={[16, 16]}>
            {carData.map((car, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                    <Card hoverable style={{ textAlign: 'center' }}>
                        <h3>{car.make} {car.model}</h3>
                        <p>
                            Color: {car.color}<br />
                            Trim: {car.trim}<br />
                            Body: {car.body}<br />
                            Price : ${car.price}
                        </p>
                        <Button type="primary"
                                style={{ marginBottom: '10px' }}
                                onClick={() => handleSearch(car.make, car.model, car.color)}
                        >
                            View Details
                        </Button>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default HomaPageCarRecommendationList;
