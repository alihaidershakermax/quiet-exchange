
export type UserRole = 'student' | 'admin' | 'owner';

export interface User {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  anonymous: boolean;
  createdAt: Date;
  replies?: Message[];
  likes: number;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
  type: 'message' | 'reply' | 'like' | 'system';
}
