import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // 导入 axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 检查 localStorage 中是否存在 token，以决定用户是否已登录
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // 登录函数：使用 axios 向后端发送登录请求
    const login = async (email, password) => {
        setLoading(true);
        setError(null); // 清空之前的错误信息
        try {
            const response = await axios.post('https://your-api-url.com/login', {
                email,
                password,
            });

            // 假设后端返回的响应格式为 { token: 'jwt-token' }
            const { token } = response.data;

            // 将 token 存储在 localStorage 中
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    // 登出函数：清除 localStorage 中的 token
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
