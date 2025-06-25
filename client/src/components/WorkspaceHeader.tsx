
import React, { useState } from 'react';
import { Typography, Button, Input, Space, Select } from 'antd';
import { PlusOutlined, SearchOutlined, EyeOutlined, ReloadOutlined, SortAscendingOutlined } from '@ant-design/icons';
import PostCreationModal from './PostCreationModal';

const { Title } = Typography;
const { Option } = Select;

const WorkspaceHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <Title level={3} style={{ margin: 0 }}>Community Posts</Title>
        
        <Space>
          <Input
            placeholder="Search posts by title or author"
            prefix={<SearchOutlined />}
            style={{ width: '250px' }}
          />
          <Select
            defaultValue="recent"
            style={{ width: 150 }}
            prefix={<SortAscendingOutlined />}
          >
            <Option value="recent">Most Recent</Option>
            <Option value="upvoted">Most Upvoted</Option>
            <Option value="rating">Highest Rated</Option>
            <Option value="comments">Most Comments</Option>
          </Select>
          <Button icon={<ReloadOutlined />}>
            Random Post
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Create Post
          </Button>
          <Button icon={<EyeOutlined />}>
            View Options
          </Button>
        </Space>
      </div>

      <PostCreationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default WorkspaceHeader;
