
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useMessages } from '@/context/MessageContext';
import { useAuth } from '@/context/AuthContext';
import MessageCard from '@/components/MessageCard';
import ComposeMessage from '@/components/ComposeMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MessageSquare } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Messages = () => {
  const { messages, loading } = useMessages();
  const { currentUser } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  
  // Filter messages based on search query and filter option
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filterOption) {
      case 'sent':
        return matchesSearch && message.senderId === currentUser?.id;
      case 'received':
        return matchesSearch && message.receiverId === currentUser?.id;
      case 'anonymous':
        return matchesSearch && message.anonymous;
      default:
        return matchesSearch;
    }
  });
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <Tabs defaultValue="messages" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="messages">View Messages</TabsTrigger>
            <TabsTrigger value="compose">Compose New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="mt-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterOption} onValueChange={setFilterOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter messages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Messages</SelectItem>
                    <SelectItem value="sent">Sent by Me</SelectItem>
                    <SelectItem value="received">Received by Me</SelectItem>
                    <SelectItem value="anonymous">Anonymous Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Messages List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 bg-whisper-light rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-whisper-primary/50" />
                  </div>
                  <div className="h-4 bg-muted rounded w-48 mb-2.5"></div>
                  <div className="h-3 bg-muted rounded w-32"></div>
                </div>
              </div>
            ) : filteredMessages.length > 0 ? (
              <div>
                {filteredMessages.map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-lg backdrop-blur-sm">
                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No messages found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? "No messages match your search criteria"
                    : "You haven't sent or received any messages yet"
                  }
                </p>
                <Button onClick={() => setSearchQuery('')}>
                  {searchQuery ? "Clear Search" : "Compose a Message"}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="compose" className="mt-6">
            <ComposeMessage />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Messages;
