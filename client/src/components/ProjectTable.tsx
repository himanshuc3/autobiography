
import React from 'react';
import { Table, Tag, Avatar, Typography, Button, Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ProjectTable = () => {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'REFERENCE',
      dataIndex: 'reference',
      key: 'reference',
      width: 120,
    },
    {
      title: 'SEARCH PROJECT NAME',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 180,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: (text: string, record: any) => (
        <div>
          <Text>{text}</Text>
          {record.status && (
            <div style={{ marginTop: '4px' }}>
              <Tag 
                color={
                  record.status === 'In Progress' ? 'green' : 
                  record.status === 'Disabled' ? 'red' : 
                  record.status === 'Under Review' ? 'orange' : 'default'
                }
              >
                {record.status}
              </Tag>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'PROJECT OWNER',
      dataIndex: 'owner',
      key: 'owner',
      width: 150,
      render: (owner: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar size={24} style={{ backgroundColor: owner.color || '#1890ff' }}>
            {owner.initials}
          </Avatar>
          <Text>{owner.name}</Text>
        </div>
      ),
    },
    {
      title: 'LAST UPDATE',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      width: 150,
    },
    {
      title: 'ACTION',
      key: 'action',
      width: 80,
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: '1', label: 'Edit' },
              { key: '2', label: 'Delete' },
              { key: '3', label: 'View Details' },
            ]
          }}
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: 1,
      reference: 'AI',
      projectName: 'Robot',
      description: 'What is robot',
      owner: { name: 'Dilan Figourik', initials: 'DF', color: '#52c41a' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '2',
      id: 2,
      reference: 'Language',
      projectName: 'Spanish Language',
      description: 'Spanish is the (or an) official lang...',
      owner: { name: 'Jacob Kristian', initials: 'JK', color: '#1890ff' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '3',
      id: 3,
      reference: 'Country',
      projectName: 'United States',
      description: '',
      status: 'In Progress',
      owner: { name: 'Jacob K', initials: 'JK', color: '#1890ff' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '4',
      id: 4,
      reference: 'Sports',
      projectName: 'Soccer',
      description: 'Messi the winner',
      owner: { name: 'Jacob K', initials: 'JK', color: '#1890ff' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '5',
      id: 5,
      reference: 'Tourist',
      projectName: 'Paris Tower',
      description: 'Dinner for Date',
      owner: { name: 'Veronica', initials: 'V', color: '#f56a00' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '6',
      id: 6,
      reference: 'AI',
      projectName: 'Robot',
      description: 'What is robot',
      owner: { name: 'Dilan Fig', initials: 'DF', color: '#52c41a' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '7',
      id: 7,
      reference: 'Language',
      projectName: 'English',
      description: 'English is a West Germanic langu...',
      owner: { name: 'Dilan Fig', initials: 'DF', color: '#52c41a' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '8',
      id: 8,
      reference: 'Sports',
      projectName: 'Cricket',
      description: 'Sachin Tendulkar',
      owner: { name: 'Veronica', initials: 'V', color: '#f56a00' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '9',
      id: 9,
      reference: 'Tourist',
      projectName: 'China Wall',
      description: 'Dinner for Date',
      owner: { name: 'Jacob K', initials: 'JK', color: '#1890ff' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '10',
      id: 10,
      reference: 'AI',
      projectName: 'Image Generation',
      description: 'What is robot',
      owner: { name: 'Veronica', initials: 'V', color: '#f56a00' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '11',
      id: 11,
      reference: 'Country',
      projectName: 'India',
      description: 'India, officially the Republic of Ind...',
      owner: { name: 'Dilan Figourik', initials: 'DF', color: '#52c41a' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
    {
      key: '12',
      id: 12,
      reference: 'AI',
      projectName: 'Music Generation',
      description: '',
      status: 'Disabled',
      owner: { name: 'Jacob Kristian', initials: 'JK', color: '#1890ff' },
      lastUpdate: 'Feb 16, 2025 at 17:53',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
      style={{
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}
    />
  );
};

export default ProjectTable;
