
import React from 'react';
import { Card, Typography, Checkbox, Space, Divider, Slider, Rate } from 'antd';
import { TagOutlined, StarOutlined, HeartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Group: CheckboxGroup } = Checkbox;

const FilterSidebar = () => {
  const tagOptions = [
    'Romance',
    'Time Travel',
    'Comedy',
    'Debut',
    'Technology',
    'Memoir',
    'Modern Life',
    'Business',
    'Biography',
    'Inspiration',
    'Personal Growth',
    'Resilience',
    'Immigration',
    'Identity'
  ];

  return (
    <div style={{ width: '280px', padding: '0 16px' }}>
      <Card 
        title={
          <Space>
            <TagOutlined />
            <span>Filters</span>
          </Space>
        }
        style={{ marginBottom: '16px' }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Title level={5}>Tags</Title>
            <CheckboxGroup
              style={{ width: '100%' }}
              options={tagOptions.map(tag => ({ label: tag, value: tag }))}
            />
          </div>
          
          <Divider />
          
          <div>
            <Title level={5}>Minimum Rating</Title>
            <Rate allowHalf defaultValue={0} />
          </div>
          
          <Divider />
          
          <div>
            <Title level={5}>Upvotes Range</Title>
            <Slider
              range
              defaultValue={[0, 100000]}
              max={100000}
              step={1000}
              tooltip={{
                formatter: (value) => `${value?.toLocaleString()}`
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <Text type="secondary">0</Text>
              <Text type="secondary">100K+</Text>
            </div>
          </div>
          
          <Divider />
          
          <div>
            <Title level={5}>Post Type</Title>
            <CheckboxGroup
              options={[
                { label: 'Winner Posts', value: 'winner' },
                { label: 'Recent Posts', value: 'recent' },
                { label: 'Trending Posts', value: 'trending' }
              ]}
            />
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default FilterSidebar;
