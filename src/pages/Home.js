import React, {useContext, useState} from 'react';
import '../styles/Home.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import headerLogo from '../assets/carquestlogo.png';
import {css} from "antd-style";
import HeaderLoginForm from "../components/HeaderLoginForm";
import {Link, useNavigate} from 'react-router-dom';
import HomepageSearchForm from "../components/HomepageSearchForm";
import {AuthContext} from "../utils/AuthContext";
import HeaderAvatar from "../components/HeaderAvatar";
import HomaPageCarRecommendationList from "../components/HomaPageCarRecommendationList";
import DemoChat from "../components/ChatbotComponent";
const { Header, Content, Footer } = Layout;
const items = new Array(1).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));
function Home() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const handleSearch = (searchData) => {
        navigate('/searchPage', { state: searchData }); // 将搜索数据传递到推荐页面
    };
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <Layout>
            <Header className="homepage-header-container"
            >
                <div className="logo" >
                    <Link to="/">
                        <img src={headerLogo} alt="Carquest Logo" />
                    </Link>
                </div>
                {!isLoggedIn ? (
                    <HeaderLoginForm />
                ) : (
                    <HeaderAvatar/>
                )}
            </Header>
            <Content className='head-content'
            >
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 560,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                        <div className="top-section">
                            <div className="search-section">
                                <HomepageSearchForm onSearch={handleSearch} />
                            </div>
                        </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        You might like these cars...
                    </p>
                </div>
                <div>
                    <HomaPageCarRecommendationList/>
                </div>
                <div>
                    <DemoChat/>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                PQWY ©{new Date().getFullYear()} Created by Group9
            </Footer>
        </Layout>
    );
}

export default Home;



