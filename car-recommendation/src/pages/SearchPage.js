import React, {useContext} from 'react';
import '../styles/Home.css';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import headerLogo from '../assets/carquestlogo.png';
import {css} from "antd-style";
import HeaderLoginForm from "../components/HeaderLoginForm";
import { useNavigate } from 'react-router-dom';
import HomepageSearchForm from "../components/HomepageSearchForm";
import RecommendedCarsModule from "../components/RecommendedCarsModule";
import {AuthContext} from "../utils/AuthContext";
import HeaderAvatar from "../components/HeaderAvatar";
const { Header, Content, Footer } = Layout;
const items = new Array(1).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));
function SearchPage() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <Layout>
            <Header className="header-container"
            >
                <div className="logo" >
                    <img  src={headerLogo} alt="Carquest Logo" />
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
                    <RecommendedCarsModule></RecommendedCarsModule>
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

export default SearchPage;



