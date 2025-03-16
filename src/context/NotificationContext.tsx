
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Notification } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

// Mock notifications
const initialNotifications: Notification[] = [
  {
    id: '1',
    userId: '1', // student
    message: 'Welcome to Whisper!',
    read: false,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    type: 'system',
  },
  {
    id: '2',
    userId: '1', // student
    message: 'You have a new reply from Admin',
    read: false,
    createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
    type: 'reply',
    link: '/messages/4', // Link to the reply
  },
];

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  loading: true,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearAll: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read && 
    (currentUser && n.userId === currentUser.id)).length;

  useEffect(() => {
    // Simulate loading notifications
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter notifications based on current user
  const userNotifications = currentUser
    ? notifications.filter(n => n.userId === currentUser.id)
    : [];

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: (Math.random() * 10000).toFixed(0),
      createdAt: new Date(),
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show a toast for the new notification
    if (newNotification.userId === currentUser?.id) {
      toast(newNotification.message, {
        action: {
          label: "View",
          onClick: () => {
            markAsRead(newNotification.id);
            if (newNotification.link) {
              window.location.href = newNotification.link;
            }
          },
        },
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    if (!currentUser) return;
    
    setNotifications(prev =>
      prev.map(notification =>
        notification.userId === currentUser.id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const clearAll = () => {
    if (!currentUser) return;
    
    setNotifications(prev =>
      prev.filter(notification => notification.userId !== currentUser.id)
    );
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications: userNotifications, 
        unreadCount, 
        loading, 
        addNotification, 
        markAsRead, 
        markAllAsRead, 
        clearAll 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
