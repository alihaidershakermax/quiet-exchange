
import React, { useState } from 'react';
import { Message, User } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useMessages } from '@/context/MessageContext';
import { formatDistanceToNow } from 'date-fns';
import { User as UserIcon, Heart, MessageSquare, Trash2, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface MessageCardProps {
  message: Message;
  showReplies?: boolean;
  isReply?: boolean;
}

// Mock function to get user by ID (in a real app, this would come from a context or API)
const getUserById = (id: string): User | undefined => {
  const mockUsers: Record<string, User> = {
    '1': { id: '1', username: 'student1', displayName: 'Student User', role: 'student', createdAt: new Date() },
    '2': { id: '2', username: 'admin1', displayName: 'Admin User', role: 'admin', createdAt: new Date() },
    '3': { id: '3', username: 'owner1', displayName: 'Owner User', role: 'owner', createdAt: new Date() },
  };
  
  return mockUsers[id];
};

const MessageCard: React.FC<MessageCardProps> = ({ message, showReplies = true, isReply = false }) => {
  const { currentUser } = useAuth();
  const { replyToMessage, likeMessage, deleteMessage } = useMessages();
  
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  
  const sender = message.anonymous 
    ? undefined 
    : getUserById(message.senderId);
  
  const handleReply = async () => {
    if (replyText.trim() && message.id) {
      await replyToMessage(message.id, replyText, isAnonymous);
      setReplyText('');
      setShowReplyForm(false);
    }
  };
  
  const handleLike = async () => {
    await likeMessage(message.id);
  };
  
  const handleDelete = async () => {
    await deleteMessage(message.id);
  };
  
  const canDelete = currentUser && (
    message.senderId === currentUser.id || 
    currentUser.role === 'admin' || 
    currentUser.role === 'owner'
  );
  
  return (
    <div className={cn(
      "message-bubble animate-fade-in",
      isReply ? "ml-8 my-3" : "my-6",
      message.senderId === currentUser?.id && !isReply ? "message-bubble-sent ml-auto" : ""
    )}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar className="h-8 w-8">
          {sender ? (
            <>
              <AvatarImage src={sender.avatar} alt={sender.displayName} />
              <AvatarFallback className="bg-whisper-primary text-white">
                {sender.displayName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </>
          ) : (
            <>
              <AvatarFallback className="bg-gray-300 text-gray-600">
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            </>
          )}
        </Avatar>
        
        {/* Message Content */}
        <div className="flex-1 min-w-0">
          {/* Sender Info */}
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium text-sm">
              {message.anonymous ? 'Anonymous' : sender?.displayName}
            </p>
            {sender && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {sender.role}
              </span>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          {/* Message Text */}
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          
          {/* Message Actions */}
          <div className="flex items-center gap-2 mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-xs p-0 h-auto" 
              onClick={handleLike}
            >
              <Heart className="h-3.5 w-3.5" />
              <span>{message.likes} {message.likes === 1 ? 'Like' : 'Likes'}</span>
            </Button>
            
            {!isReply && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-xs p-0 h-auto"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Reply</span>
              </Button>
            )}
            
            {canDelete && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-xs p-0 h-auto text-red-500 hover:text-red-700" 
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </Button>
            )}
          </div>
          
          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-24 resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="anonymous-mode"
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                  />
                  <Label htmlFor="anonymous-mode" className="text-xs">Send anonymously</Label>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowReplyForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                    className="flex items-center gap-1"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Replies */}
          {showReplies && message.replies && message.replies.length > 0 && (
            <Collapsible className="mt-4">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs w-full justify-start px-0">
                  {message.replies.length} {message.replies.length === 1 ? 'Reply' : 'Replies'}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {message.replies.map((reply) => (
                  <MessageCard
                    key={reply.id}
                    message={reply}
                    showReplies={false}
                    isReply={true}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
