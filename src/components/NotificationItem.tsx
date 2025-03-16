
import React from 'react';
import { Notification } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { Bell, MessageSquare, Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/context/NotificationContext';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { markAsRead } = useNotifications();
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };
  
  const getIcon = () => {
    switch (notification.type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-whisper-primary" />;
      case 'reply':
        return <MessageSquare className="h-5 w-5 text-whisper-secondary" />;
      case 'like':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'system':
      default:
        return <Bell className="h-5 w-5 text-whisper-accent" />;
    }
  };
  
  const content = (
    <div 
      className={cn(
        "p-4 border rounded-lg flex items-start gap-3 transition-all",
        notification.read ? "bg-white" : "bg-whisper-light/30"
      )}
    >
      <div className="shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>
      {!notification.read && (
        <div className="shrink-0">
          <div className="h-2 w-2 rounded-full bg-whisper-primary" />
        </div>
      )}
    </div>
  );
  
  if (notification.link) {
    return (
      <Link to={notification.link} onClick={handleClick}>
        {content}
      </Link>
    );
  }
  
  return content;
};

export default NotificationItem;
