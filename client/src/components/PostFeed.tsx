
import React from 'react';
import PostCard from './PostCard';

const PostFeed = () => {
  const posts = [
    {
      id: '1',
      user: { name: 'Kaliane Bradley', initials: 'KB', color: '#1890ff' },
      bookCover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&h=180&fit=crop',
      title: 'The Ministry of Time',
      author: 'Kaliane Bradley',
      description: "If you've ever wondered what it would be like to fall in love with a 19th-century polar explorer, author Kaliane Bradley has the book for you. The Ministry of Time is a delightfully playful twist on the time-travel romance, with elements of workplace comedy, roommate drama, espionage, and temporal physics. Stay tuned: It's also Bradley's debut novel.",
      tags: ['Romance', 'Time Travel', 'Comedy', 'Debut'],
      votes: 78459,
      isWinner: true,
      rating: 4
    },
    {
      id: '2',
      user: { name: 'Sarah Chen', initials: 'SC', color: '#52c41a' },
      bookCover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=180&fit=crop',
      title: 'Digital Horizons',
      author: 'Sarah Chen',
      description: 'A compelling story about navigating the intersection of technology and humanity in the modern age. This memoir explores the challenges and opportunities of our digital world.',
      tags: ['Technology', 'Memoir', 'Modern Life'],
      votes: 45632,
      isWinner: false,
      rating: 5
    },
    {
      id: '3',
      user: { name: 'Marcus Williams', initials: 'MW', color: '#f56a00' },
      bookCover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=120&h=180&fit=crop',
      title: 'Journey Through Silicon Valley',
      author: 'Marcus Williams',
      description: 'An inside look at the rise and evolution of tech culture, told through personal experiences and industry insights.',
      tags: ['Business', 'Technology', 'Biography'],
      votes: 32148,
      isWinner: false,
      rating: 3
    },
    {
      id: '4',
      user: { name: 'Emma Rodriguez', initials: 'ER', color: '#722ed1' },
      bookCover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=180&fit=crop',
      title: 'The Art of Resilience',
      author: 'Emma Rodriguez',
      description: 'A powerful narrative about overcoming adversity and finding strength in unexpected places. This autobiography chronicles a journey of personal growth and discovery.',
      tags: ['Inspiration', 'Personal Growth', 'Resilience'],
      votes: 67891,
      isWinner: false,
      rating: 5
    },
    {
      id: '5',
      user: { name: 'David Park', initials: 'DP', color: '#13c2c2' },
      bookCover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=180&fit=crop',
      title: 'Coding My Way Home',
      author: 'David Park',
      description: 'From immigrant child to successful software engineer, this story explores identity, belonging, and the pursuit of the American dream through the lens of technology.',
      tags: ['Immigration', 'Technology', 'Identity'],
      votes: 54723,
      isWinner: false,
      rating: 4
    }
  ];

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostFeed;
