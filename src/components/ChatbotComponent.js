import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { AudioOutlined } from '@ant-design/icons'; // 使用麦克风图标
import DisplayWrapper from './DisplayWrapper';
import { Chat } from 'react-jwchat';
import { contact, my } from './displayData';
import userAvatar from "../assets/chatbotavatar.jpg"

export default function DemoChat() {
    const [chatListData, setChatListData] = useState([]); // 聊天记录
    const [visible, setVisible] = useState(false); // 控制 Modal 显示隐藏
    const [isListening, setIsListening] = useState(false); // 控制语音识别状态

    // Web Speech API 实现
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // 设置语音识别的语言
    recognition.continuous = false; // 非连续模式
    recognition.interimResults = false; // 不显示临时结果

    const handleSend = (msg) => {
        // 先将用户消息添加到聊天记录中
        setChatListData([...chatListData, msg]);

        // 发送消息到后端
        axios.post('http://localhost:5000/geminichat', msg)
            .then(response => {
                // 从返回的响应中提取AI生成的文本内容
                const aiResponseText = response.data.response;

                // 生成AI的消息对象
                const aiResponseMsg = {
                    _id: new Date().getTime().toString(),
                    date: Math.floor(new Date().getTime() / 1000),
                    user: {
                        id: '9527',
                        avatar: userAvatar,// 设置AI头像URL
                        nickname: 'Carini'
                    },
                    message: {
                        type: 'text',
                        content: aiResponseText
                    }
                };

                // 将AI消息添加到聊天记录中
                setChatListData(prevChatListData => [...prevChatListData, aiResponseMsg]);
            })
            .catch(error => {
                console.error('消息发送失败', error);
            });
    };

    // 打开聊天窗口
    const showModal = () => {
        setVisible(true);
    };

    // 关闭聊天窗口
    const handleCancel = () => {
        setVisible(false);
    };

    // 启动语音识别
    const startRecognition = () => {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            console.log("识别结果:", speechToText);

            // 将语音识别的文本作为消息发送
            const speechMsg = {
                _id: new Date().getTime().toString(), // 生成唯一 ID
                date:  new Date().toISOString(),
                user: { id: my.id, avatar: my.avatar, nickname: my.nickname },
                message: { type: 'text', content: speechToText }
            };
            handleSend(speechMsg);
        };

        recognition.onend = () => {
            setIsListening(false); // 识别结束
        };

        recognition.onerror = (event) => {
            console.error("识别错误: ", event.error);
            setIsListening(false);
        };
    };

    return (
        <div>
            {/* 点击按钮打开聊天窗口 */}
            <Button type="primary" onClick={showModal} style={{ position: 'fixed', bottom: 30, right: 30 }}>
                Carini Chat
            </Button>

            {/* 悬浮聊天窗口 */}
            <Modal
                title="Chat Window"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
                width={650}
            >
                <DisplayWrapper>
                    <Chat
                        contact={contact}
                        me={my}
                        chatList={chatListData}
                        onSend={handleSend}
                        onEarlier={() => console.log('load history')}
                        style={{
                            width: 600,
                            height: 500,
                            borderRadius: 5,
                            border: '1px solid rgb(226, 226, 226)',
                        }}
                    />
                </DisplayWrapper>
                <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    If typing is inconvenient, you can try using voice input.
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                        type="primary"
                        icon={<AudioOutlined />}
                        onClick={startRecognition}
                        loading={isListening} // 显示录音状态
                    >
                        {isListening ? "listening..." : "press to speak"}
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
