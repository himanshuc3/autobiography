
import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
  HomeOutlined,
  PlayCircleOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  BarChartOutlined,
  RobotOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  CommentOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = () => {
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'videos',
      icon: <PlayCircleOutlined />,
      label: 'Videos & Webinars',
    },
    {
      key: 'quartet',
      icon: <DatabaseOutlined />,
      label: 'Quartet CMD',
    },
    {
      key: 'media',
      icon: <FileTextOutlined />,
      label: 'Media',
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      key: 'ai',
      icon: <RobotOutlined />,
      label: 'AI',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: 'Help',
    },
    {
      key: 'feedback',
      icon: <CommentOutlined />,
      label: 'Feedbacks',
    },
  ];

  return (
    <Sider 
      width={240} 
      style={{ 
        background: '#f8f9fa',
        borderRight: '1px solid #e5e7eb',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        overflow: 'auto'
      }}
    >
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            E
          </div>
          <Text strong style={{ fontSize: '16px' }}>ensemble</Text>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar size={24} style={{ backgroundColor: '#1890ff' }}>JK</Avatar>
          <Text style={{ fontSize: '14px' }}>Jacob Kristian</Text>
        </div>
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={['home']}
        items={menuItems}
        style={{ 
          border: 'none',
          background: 'transparent',
          marginTop: '8px'
        }}
      />
    </Sider>
  );
};

export default Sidebar;
