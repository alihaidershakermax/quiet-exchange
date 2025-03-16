
import React from 'react';
import Layout from '@/components/Layout';
import { useNotifications } from '@/context/NotificationContext';
import NotificationItem from '@/components/NotificationItem';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Check, Trash2 } from 'lucide-react';

const Notifications = () => {
  const { notifications, unreadCount, markAllAsRead, clearAll } = useNotifications();
  
  const unreadNotifications = notifications.filter(notification => !notification.read);
  const readNotifications = notifications.filter(notification => notification.read);
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
                : 'No new notifications'}
            </p>
          </div>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={markAllAsRead}
              >
                <Check className="h-4 w-4" />
                Mark all as read
              </Button>
            )}
            
            {notifications.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={clearAll}
              >
                <Trash2 className="h-4 w-4" />
                Clear all
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="read">
              Read ({readNotifications.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-lg">
                <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You don't have any notifications yet.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="mt-6">
            {unreadNotifications.length > 0 ? (
              <div className="space-y-4">
                {unreadNotifications.map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-lg">
                <Check className="h-10 w-10 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  You have no unread notifications.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="read" className="mt-6">
            {readNotifications.length > 0 ? (
              <div className="space-y-4">
                {readNotifications.map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-lg">
                <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No read notifications</h3>
                <p className="text-muted-foreground">
                  You don't have any read notifications yet.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;
