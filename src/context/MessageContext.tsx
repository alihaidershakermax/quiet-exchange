
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Message, User } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface MessageContextType {
  messages: Message[];
  loading: boolean;
  sendMessage: (content: string, receiverId: string, anonymous: boolean) => Promise<void>;
  replyToMessage: (parentMessageId: string, content: string, anonymous: boolean) => Promise<void>;
  likeMessage: (messageId: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
}

// Mock messages for demo
const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Welcome to Whisper! The anonymous messaging platform.',
    senderId: '3', // owner
    receiverId: 'all',
    anonymous: false,
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    likes: 5,
  },
  {
    id: '2',
    content: 'Feel free to send messages anonymously to anyone on the platform.',
    senderId: '2', // admin
    receiverId: 'all',
    anonymous: false,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    likes: 3,
  },
  {
    id: '3',
    content: 'How do I use this platform?',
    senderId: '1', // student
    receiverId: '2', // admin
    anonymous: true,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    likes: 0,
    replies: [
      {
        id: '4',
        content: 'Just select a recipient and send a message. You can choose to remain anonymous!',
        senderId: '2', // admin
        receiverId: '1', // student
        anonymous: false,
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        likes: 1,
      },
    ],
  },
];

const MessageContext = createContext<MessageContextType>({
  messages: [],
  loading: true,
  sendMessage: async () => {},
  replyToMessage: async () => {},
  likeMessage: async () => {},
  deleteMessage: async () => {},
});

export const useMessages = () => useContext(MessageContext);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Simulate loading messages
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async (content: string, receiverId: string, anonymous: boolean) => {
    if (!currentUser) {
      toast.error('You must be logged in to send messages');
      return;
    }

    try {
      const newMessage: Message = {
        id: (Math.random() * 10000).toFixed(0),
        content,
        senderId: currentUser.id,
        receiverId,
        anonymous,
        createdAt: new Date(),
        likes: 0,
      };

      setMessages(prevMessages => [newMessage, ...prevMessages]);
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    }
  };

  const replyToMessage = async (parentMessageId: string, content: string, anonymous: boolean) => {
    if (!currentUser) {
      toast.error('You must be logged in to reply');
      return;
    }

    try {
      const parentMessageIndex = messages.findIndex(m => m.id === parentMessageId);
      
      if (parentMessageIndex === -1) {
        throw new Error('Message not found');
      }

      const parentMessage = messages[parentMessageIndex];
      
      const newReply: Message = {
        id: (Math.random() * 10000).toFixed(0),
        content,
        senderId: currentUser.id,
        receiverId: parentMessage.senderId,
        anonymous,
        createdAt: new Date(),
        likes: 0,
      };

      const updatedMessages = [...messages];
      if (!updatedMessages[parentMessageIndex].replies) {
        updatedMessages[parentMessageIndex].replies = [];
      }
      
      updatedMessages[parentMessageIndex].replies!.push(newReply);
      
      setMessages(updatedMessages);
      toast.success('Reply sent');
    } catch (error) {
      toast.error('Failed to send reply');
      console.error(error);
    }
  };

  const likeMessage = async (messageId: string) => {
    if (!currentUser) {
      toast.error('You must be logged in to like messages');
      return;
    }

    try {
      // Find the message in the top level messages
      let messageIndex = messages.findIndex(m => m.id === messageId);
      let parentIndex = -1;
      let replyIndex = -1;
      
      // If not found at top level, check in replies
      if (messageIndex === -1) {
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].replies) {
            replyIndex = messages[i].replies.findIndex(r => r.id === messageId);
            if (replyIndex !== -1) {
              parentIndex = i;
              break;
            }
          }
        }
      }

      const updatedMessages = [...messages];
      
      if (messageIndex !== -1) {
        // Update top-level message
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          likes: updatedMessages[messageIndex].likes + 1,
        };
      } else if (parentIndex !== -1 && replyIndex !== -1) {
        // Update reply
        const replies = [...(updatedMessages[parentIndex].replies || [])];
        replies[replyIndex] = {
          ...replies[replyIndex],
          likes: replies[replyIndex].likes + 1,
        };
        updatedMessages[parentIndex].replies = replies;
      } else {
        throw new Error('Message not found');
      }
      
      setMessages(updatedMessages);
      toast.success('Liked message');
    } catch (error) {
      toast.error('Failed to like message');
      console.error(error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!currentUser) {
      toast.error('You must be logged in to delete messages');
      return;
    }

    try {
      // Check if it's a top-level message
      const messageIndex = messages.findIndex(m => m.id === messageId);
      
      if (messageIndex !== -1) {
        const message = messages[messageIndex];
        
        // Only allow deletion if user is the sender, an admin, or owner
        if (message.senderId === currentUser.id || 
            currentUser.role === 'admin' || 
            currentUser.role === 'owner') {
          
          const updatedMessages = [...messages];
          updatedMessages.splice(messageIndex, 1);
          setMessages(updatedMessages);
          toast.success('Message deleted');
          return;
        }
      }
      
      // Check if it's a reply
      let foundInReplies = false;
      const updatedMessages = [...messages];
      
      for (let i = 0; i < updatedMessages.length; i++) {
        if (updatedMessages[i].replies) {
          const replyIndex = updatedMessages[i].replies.findIndex(r => r.id === messageId);
          
          if (replyIndex !== -1) {
            const reply = updatedMessages[i].replies[replyIndex];
            
            // Only allow deletion if user is the sender, an admin, or owner
            if (reply.senderId === currentUser.id || 
                currentUser.role === 'admin' || 
                currentUser.role === 'owner') {
              
              updatedMessages[i].replies.splice(replyIndex, 1);
              setMessages(updatedMessages);
              toast.success('Reply deleted');
              foundInReplies = true;
              break;
            }
          }
        }
      }
      
      if (!foundInReplies) {
        throw new Error('You do not have permission to delete this message');
      }
    } catch (error) {
      toast.error('Failed to delete message: ' + (error as Error).message);
      console.error(error);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, loading, sendMessage, replyToMessage, likeMessage, deleteMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
