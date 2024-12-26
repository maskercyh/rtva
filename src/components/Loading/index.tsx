import React from "react";
import { Spin, Typography, Space } from "antd";
import "./index.css"; // 引入 CSS 样式

const { Title, Text } = Typography;

const Loading: React.FC = () => {
  return (
    <div className="loading-app">
      <div className="loading-content">
        <Spin size="large" className="loading-spinner" />
        <Space
          direction="vertical"
          align="center"
          size="middle"
          className="loading-text"
        >
          <Title level={3}>正在加载资源</Title>
          <Text type="secondary">初次加载资源可能需要较多时间 请耐心等待</Text>
        </Space>
      </div>
    </div>
  );
};

export default Loading; /* Loading.css */
