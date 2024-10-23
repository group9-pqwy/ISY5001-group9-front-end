import React, { useContext } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {AuthContext} from "../utils/AuthContext";

const HeaderAvatar: React.FC = () => {
    const { logout } = useContext(AuthContext);

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'logout') {
            logout();
        }
    };

    const items: MenuProps['items'] = [
        {
            key: 'logout',
            label: 'Logout',
        },
    ];

    return (
        <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
            <Avatar size={48} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>
    );
};

export default HeaderAvatar;
