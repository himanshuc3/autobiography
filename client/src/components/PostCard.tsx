
import React from 'react';
import { Card, Avatar, Typography, Tag, Space, Button, Divider } from 'antd';
import { HeartOutlined, MessageOutlined, TwitterOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Text, Title, Paragraph } = Typography;

interface PostCardProps {
  id: string;
  user: {
    name: string;
    initials: string;
    color: string;
  };
  bookCover: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  votes: number;
  isWinner?: boolean;
  rating: number;
}

const PostCard = ({ 
  id,
  user, 
  bookCover, 
  title, 
  author, 
  description, 
  tags, 
  votes, 
  isWinner = false,
  rating 
}: PostCardProps) => {
  return (
    <Card 
      style={{ 
        marginBottom: '24px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Book Cover */}
        <div style={{ flexShrink: 0 }}>
          <Link to={`/post/${id}`}>
            <img 
              src={bookCover} 
              alt={title}
              style={{ 
                width: '120px', 
                height: '180px', 
                objectFit: 'cover',
                borderRadius: '4px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }} 
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </Link>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {/* Header with user info and winner badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Avatar size={32} style={{ backgroundColor: user.color }}>
              {user.initials}
            </Avatar>
            <Text strong>{user.name}</Text>
            {isWinner && (
              <Tag color="gold" style={{ margin: 0 }}>
                <StarOutlined /> WINNER
              </Tag>
            )}
            <Text type="secondary">{votes.toLocaleString()} votes</Text>
          </div>

          {/* Title and Author */}
          <Link to={`/post/${id}`} style={{ textDecoration: 'none' }}>
            <Title 
              level={3} 
              style={{ 
                margin: '0 0 8px 0', 
                color: '#1f5f5b',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#0f4c47'}
              onMouseOut={(e) => e.currentTarget.style.color = '#1f5f5b'}
            >
              {title}
            </Title>
          </Link>
          <Text type="secondary" style={{ fontSize: '14px', marginBottom: '16px', display: 'block' }}>
            by {author}
          </Text>

          {/* Description */}
          <Paragraph style={{ marginBottom: '16px', color: '#666' }}>
            {description}
          </Paragraph>

          {/* Tags */}
          <div style={{ marginBottom: '16px' }}>
            <Space wrap>
              {tags.map((tag, index) => (
                <Tag key={index} color="blue">
                  {tag}
                </Tag>
              ))}
            </Space>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Text>Rate it:</Text>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarOutlined 
                  key={star}
                  style={{ 
                    color: star <= rating ? '#faad14' : '#d9d9d9',
                    fontSize: '16px'
                  }} 
                />
              ))}
            </div>
          </div>

          <Divider style={{ margin: '16px 0' }} />

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <Button type="text" icon={<HeartOutlined />} size="small">
                Upvote
              </Button>
              <Link to={`/post/${id}`}>
                <Button type="text" icon={<MessageOutlined />} size="small">
                  Comments
                </Button>
              </Link>
              <Button type="text" icon={<TwitterOutlined />} size="small">
                Share
              </Button>
            </Space>
            <Button type="primary" size="small">
              Want to Read
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
