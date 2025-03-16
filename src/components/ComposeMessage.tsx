
import React, { useState } from 'react';
import { useMessages } from '@/context/MessageContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface ComposeMessageProps {
  recipientId?: string;
  onSent?: () => void;
}

// Mock recipients (in a real app, this would come from an API or context)
const RECIPIENTS = [
  { id: '1', name: 'Student User' },
  { id: '2', name: 'Admin User' },
  { id: '3', name: 'Owner User' },
  { id: 'all', name: 'Everyone' },
];

const ComposeMessage: React.FC<ComposeMessageProps> = ({ recipientId: initialRecipientId, onSent }) => {
  const { sendMessage } = useMessages();
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [recipientId, setRecipientId] = useState(initialRecipientId || 'all');
  
  const handleSend = async () => {
    if (!currentUser) {
      toast.error(t.loginFailed);
      return;
    }
    
    if (!message.trim()) {
      toast.error(t.messageEmpty);
      return;
    }
    
    try {
      await sendMessage(message, recipientId, isAnonymous);
      setMessage('');
      toast.success(t.messageSent);
      
      if (onSent) {
        onSent();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  
  return (
    <div className="glass-card p-4 rounded-xl mb-8 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4">{t.compose}</h2>
      
      <div className="space-y-4">
        {!initialRecipientId && (
          <div>
            <Label htmlFor="recipient">{t.sendTo}</Label>
            <Select value={recipientId} onValueChange={setRecipientId}>
              <SelectTrigger id="recipient" className="w-full">
                <SelectValue placeholder={t.sendTo} />
              </SelectTrigger>
              <SelectContent>
                {RECIPIENTS.filter(r => r.id !== currentUser?.id).map((recipient) => (
                  <SelectItem key={recipient.id} value={recipient.id}>
                    {recipient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div>
          <Label htmlFor="message">{t.yourMessage}</Label>
          <Textarea
            id="message"
            placeholder={t.yourMessage}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-32 resize-none"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="anonymous-mode"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
            <Label htmlFor="anonymous-mode" className="flex items-center gap-1">
              {t.sendAnonymously}
              <Lock className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
            </Label>
          </div>
          
          <Button onClick={handleSend} className="flex items-center gap-1">
            <Send className="h-4 w-4" />
            {t.send}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComposeMessage;
