
import React, { useState } from 'react';
import { Dropdown, Avatar, Typography, Space, Button } from 'antd';
import { 
  BellOutlined, 
  MessageOutlined, 
  FileTextOutlined, 
  HeartOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Button as ShadcnButton } from '@/components/ui/button';
import AuthModal from './AuthModal';

const { Text } = Typography;

const UserProfile = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // TODO: Replace with actual user authentication state
  const isLoggedIn = false; // This should come from your auth context/state

  const profileMenuItems = [
    {
      key: 'profile',
      label: (
        <div style={{ padding: '8px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Avatar size={40} style={{ backgroundColor: '#1890ff' }}>JK</Avatar>
            <div>
              <Text strong>Jacob Kristian</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>jacob@ensemble.com</Text>
            </div>
          </div>
          <Text type="secondary" style={{ fontSize: '12px' }}>Reports to</Text>
          <br />
          <Text style={{ fontSize: '12px' }}>👤 Melomia Zeuski</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px', marginTop: '4px' }}>Mobile</Text>
          <br />
          <Text style={{ fontSize: '12px' }}>📞 +1 83773 48843</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px', marginTop: '4px' }}>Location</Text>
          <br />
          <Text style={{ fontSize: '12px' }}>🌍 United States</Text>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
            <Button size="small" type="default">Leave</Button>
            <Button size="small" type="primary">Change</Button>
          </div>
        </div>
      ),
    },
  ];

  if (!isLoggedIn) {
    return (
      <>
        <ShadcnButton 
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Login
        </ShadcnButton>
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <BellOutlined style={{ fontSize: '18px', color: '#666' }} />
      <MessageOutlined style={{ fontSize: '18px', color: '#666' }} />
      <FileTextOutlined style={{ fontSize: '18px', color: '#666' }} />
      <HeartOutlined style={{ fontSize: '18px', color: '#666' }} />
      
      <Dropdown 
        menu={{ items: profileMenuItems }} 
        placement="bottomRight"
        trigger={['click']}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <Avatar size={32} style={{ backgroundColor: '#1890ff' }}>JK</Avatar>
          <Text>Jacob Kristian</Text>
        </div>
      </Dropdown>
    </div>
  );
};

export default UserProfile;
