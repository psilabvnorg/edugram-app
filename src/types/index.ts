// Types for EduGram - Educational Instagram Clone

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  category: Category;
  followers: number;
  following: number;
  posts: number;
  isVerified: boolean;
  isFollowing?: boolean;
}

export type Category = 'IELTS' | 'Marketing' | 'Finance' | 'MBA' | 'Design' | 'Leadership' | 'All';

export interface Post {
  id: string;
  userId: string;
  user: User;
  image?: string;
  content: string;
  category: Category;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  tags?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  likes: number;
  createdAt: string;
}

export interface Story {
  id: string;
  userId: string;
  user: User;
  image: string;
  hasUnseen: boolean;
}

export interface Topic {
  id: string;
  name: string;
  category: Category;
  image: string;
  postCount: number;
  followerCount: number;
}
