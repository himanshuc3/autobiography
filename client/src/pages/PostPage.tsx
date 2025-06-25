import React from "react";
import { useParams, Link } from "react-router-dom";
import { Layout, Typography, Button, Avatar, Tag, Space, Divider } from "antd";
import {
  ArrowLeftOutlined,
  HeartOutlined,
  MessageOutlined,
  TwitterOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Sidebar from "../components/sidebar";
import UserProfile from "../components/UserProfile";
import CommentSection from "../components/CommentSection";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const PostPage = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would be fetched based on the ID
  const post = {
    id: id,
    user: { name: "Kaliane Bradley", initials: "KB", color: "#1890ff" },
    bookCover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop",
    title: "The Ministry of Time",
    author: "Kaliane Bradley",
    description:
      "If you've ever wondered what it would be like to fall in love with a 19th-century polar explorer, author Kaliane Bradley has the book for you. The Ministry of Time is a delightfully playful twist on the time-travel romance, with elements of workplace comedy, roommate drama, espionage, and temporal physics. Stay tuned: It's also Bradley's debut novel.",
    fullDescription:
      "The Ministry of Time is a brilliant debut that combines the best elements of science fiction, romance, and comedy into something entirely unique. Bradley's writing is both accessible and sophisticated, handling complex themes of time, identity, and love with remarkable skill. The novel follows a civil servant who becomes involved in a secret government program that brings people from the past into the present day. What starts as a bureaucratic arrangement quickly becomes something much more personal and dangerous. The chemistry between the characters is electric, and Bradley's world-building is both imaginative and grounded in real historical detail.",
    tags: ["Romance", "Time Travel", "Comedy", "Debut"],
    votes: 78459,
    isWinner: true,
    rating: 4,
    publishedDate: "2024",
    pages: 368,
    isbn: "978-1234567890",
    genre: "Science Fiction Romance",
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Sidebar />

      <Layout style={{ marginLeft: 240 }}>
        <Header
          style={{
            background: "white",
            padding: "0 24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link to="/">
              <Button type="text" icon={<ArrowLeftOutlined />}>
                Back to Feed
              </Button>
            </Link>
            <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
              Book Details
            </Title>
          </div>
          <UserProfile />
        </Header>

        <Content style={{ padding: "24px", background: "#f8f9fa" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div
              style={{
                background: "white",
                padding: "32px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                marginBottom: "24px",
              }}
            >
              <div
                style={{ display: "flex", gap: "32px", marginBottom: "24px" }}
              >
                {/* Book Cover */}
                <div style={{ flexShrink: 0 }}>
                  <img
                    src={post.bookCover}
                    alt={post.title}
                    style={{
                      width: "200px",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                    }}
                  />
                </div>

                {/* Book Details */}
                <div style={{ flex: 1 }}>
                  {/* Header with user info and winner badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <Avatar
                      size={40}
                      style={{ backgroundColor: post.user.color }}
                    >
                      {post.user.initials}
                    </Avatar>
                    <Text strong>{post.user.name}</Text>
                    {post.isWinner && (
                      <Tag color="gold" style={{ margin: 0 }}>
                        <StarOutlined /> WINNER
                      </Tag>
                    )}
                    <Text type="secondary">
                      {post.votes.toLocaleString()} votes
                    </Text>
                  </div>

                  {/* Title and Author */}
                  <Title
                    level={1}
                    style={{
                      margin: "0 0 8px 0",
                      color: "#1f5f5b",
                      fontSize: "32px",
                    }}
                  >
                    {post.title}
                  </Title>
                  <Text
                    style={{
                      fontSize: "18px",
                      marginBottom: "16px",
                      display: "block",
                      color: "#666",
                    }}
                  >
                    by {post.author}
                  </Text>

                  {/* Book Info */}
                  <div style={{ marginBottom: "16px" }}>
                    <Space direction="vertical" size="small">
                      <div>
                        <Text strong>Published:</Text>{" "}
                        <Text>{post.publishedDate}</Text>
                      </div>
                      <div>
                        <Text strong>Pages:</Text> <Text>{post.pages}</Text>
                      </div>
                      <div>
                        <Text strong>Genre:</Text> <Text>{post.genre}</Text>
                      </div>
                      <div>
                        <Text strong>ISBN:</Text> <Text>{post.isbn}</Text>
                      </div>
                    </Space>
                  </div>

                  {/* Tags */}
                  <div style={{ marginBottom: "20px" }}>
                    <Space wrap>
                      {post.tags.map((tag, index) => (
                        <Tag key={index} color="blue">
                          {tag}
                        </Tag>
                      ))}
                    </Space>
                  </div>

                  {/* Rating */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <Text strong>Rating:</Text>
                    <div style={{ display: "flex", gap: "2px" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarOutlined
                          key={star}
                          style={{
                            color: star <= post.rating ? "#faad14" : "#d9d9d9",
                            fontSize: "20px",
                          }}
                        />
                      ))}
                    </div>
                    <Text>({post.rating}/5)</Text>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "12px" }}>
                    <Button type="primary" size="large">
                      Want to Read
                    </Button>
                    <Button icon={<HeartOutlined />} size="large">
                      Upvote
                    </Button>
                    <Button icon={<TwitterOutlined />} size="large">
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Full Description */}
              <div>
                <Title level={3} style={{ marginBottom: "16px" }}>
                  About this book
                </Title>
                <Paragraph
                  style={{ fontSize: "16px", lineHeight: "1.6", color: "#444" }}
                >
                  {post.fullDescription}
                </Paragraph>
              </div>
            </div>

            {/* Comments Section */}
            <CommentSection postId={post.id} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PostPage;
