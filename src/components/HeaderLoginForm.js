import React, { useEffect, useState, useContext } from 'react';
import { AntDesignOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, Space, message } from 'antd';
import { createStyles } from 'antd-style';
import { AuthContext } from '../utils/AuthContext'; // 导入 AuthContext

const useStyle = createStyles(({ prefixCls, css }) => ({
    headLinearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const HeadLoginForm = () => {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);
    const { styles } = useStyle();

    // 从 AuthContext 中获取 login, loading, error
    const { login, loading, error } = useContext(AuthContext);

    // 当组件挂载后，设置 clientReady 为 true
    useEffect(() => {
        setClientReady(true);
    }, []);

    // 提交表单时调用 AuthContext 中的 login 方法
    const onFinish = (values) => {
        login(values.username, values.password);
    };

    // 当 error 发生变化时，显示错误信息
    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    return (
        <Form form={form}  layout="inline" onFinish={onFinish}>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                    <ConfigProvider
                        button={{
                            className: styles.headLinearGradientButton,
                        }}
                    >
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading} // 显示加载状态
                            >
                                Log in
                            </Button>
                        </Space>
                    </ConfigProvider>
                )}
            </Form.Item>
        </Form>
    );
};

export default HeadLoginForm;
