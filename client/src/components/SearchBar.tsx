
import React from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';
import {
  RobotOutlined,
  FilterOutlined,
  NumberOutlined,
  CodeOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const SearchBar = () => {
  const searchOptions = [
    {
      icon: <RobotOutlined style={{ color: '#1890ff' }} />,
      title: 'AI Search',
      description: 'Search for highly relevant results'
    },
    {
      icon: <FilterOutlined style={{ color: '#52c41a' }} />,
      title: 'Fielded Search',
      description: 'Search with filters and keywords'
    },
    {
      icon: <NumberOutlined style={{ color: '#fa8c16' }} />,
      title: 'Numbers Search',
      description: 'Search for patients using numbers'
    },
    {
      icon: <CodeOutlined style={{ color: '#722ed1' }} />,
      title: 'Commands',
      description: 'Search using simple strings'
    }
  ];

  return (
    <Row gutter={16} style={{ marginBottom: '24px' }}>
      {searchOptions.map((option, index) => (
        <Col span={6} key={index}>
          <Card 
            hoverable
            style={{ 
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              cursor: 'pointer'
            }}
            bodyStyle={{ padding: '16px' }}
          >
            <Space direction="vertical" size={4}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {option.icon}
                <Text strong>{option.title}</Text>
              </div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {option.description}
              </Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SearchBar;
