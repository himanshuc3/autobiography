
import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Input, Space, Divider } from 'antd';
import { MessageOutlined, HeartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');

  // Mock comments data
  const comments = [
    {
      id: '1',
      user: { name: 'Sarah Chen', initials: 'SC', color: '#52c41a' },
      content: 'I absolutely loved this book! The time travel elements were so well done and the romance was perfect. Bradley really knows how to blend genres.',
      timestamp: '2 hours ago',
      likes: 12
    },
    {
      id: '2',
      user: { name: 'Marcus Williams', initials: 'MW', color: '#f56a00' },
      content: 'This was my first time reading anything with time travel and I was skeptical, but this book completely won me over. The characters felt so real despite the fantastical premise.',
      timestamp: '5 hours ago',
      likes: 8
    },
    {
      id: '3',
      user: { name: 'Emma Rodriguez', initials: 'ER', color: '#722ed1' },
      content: 'The workplace comedy aspect really sets this apart from other time travel romances. Bradley has such a unique voice!',
      timestamp: '1 day ago',
      likes: 15
    }
  ];

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // TODO: Implement actual comment submission
      console.log('Submitting comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <Card 
      style={{ 
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <MessageOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
        <Title level={3} style={{ margin: 0 }}>
          Comments ({comments.length})
        </Title>
      </div>

      {/* Add Comment */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <Avatar size={40} style={{ backgroundColor: '#1890ff', flexShrink: 0 }}>
            JK
          </Avatar>
          <div style={{ flex: 1 }}>
            <TextArea
              placeholder="Share your thoughts about this book..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              style={{ marginBottom: '12px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                type="primary" 
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Comments List */}
      <div>
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Avatar size={40} style={{ backgroundColor: comment.user.color, flexShrink: 0 }}>
                {comment.user.initials}
              </Avatar>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '8px' }}>
                  <Text strong>{comment.user.name}</Text>
                  <Text type="secondary" style={{ marginLeft: '8px', fontSize: '12px' }}>
                    {comment.timestamp}
                  </Text>
                </div>
                <Text style={{ display: 'block', marginBottom: '12px', lineHeight: '1.5' }}>
                  {comment.content}
                </Text>
                <Space>
                  <Button 
                    type="text" 
                    size="small" 
                    icon={<HeartOutlined />}
                    style={{ padding: '0 8px', height: 'auto' }}
                  >
                    {comment.likes}
                  </Button>
                  <Button 
                    type="text" 
                    size="small"
                    style={{ padding: '0 8px', height: 'auto' }}
                  >
                    Reply
                  </Button>
                </Space>
              </div>
            </div>
            {index < comments.length - 1 && (
              <Divider style={{ margin: '20px 0' }} />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CommentSection;
