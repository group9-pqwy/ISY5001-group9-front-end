import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const HeaderAvatar = () => (
    <Space direction="vertical" size={16}>
        <Space wrap size={16}>
            <Avatar size={64} icon={<UserOutlined />} />
            <Avatar size="large" icon={<UserOutlined />} />
            <Avatar icon={<UserOutlined />} />
            <Avatar size="small" icon={<UserOutlined />} />
            <Avatar size={14} icon={<UserOutlined />} />
        </Space>
    </Space>
);

export default HeaderAvatar;