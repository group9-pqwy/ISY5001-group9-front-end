import React, { useEffect, useState } from 'react';
import {AntDesignOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, ConfigProvider, Form, Input, Space} from 'antd';
import {createStyles} from "antd-style";

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
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

    // To disable submit button at the beginning.
    useEffect(() => {
        setClientReady(true);
    }, []);
    const onFinish = (values) => {
        console.log('Finish:', values);
    };
    return (
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
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
                            className: styles.linearGradientButton,
                        }}
                    >
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !clientReady ||
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
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