
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { X, Paperclip, Minus, Maximize2, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ComposeEmailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  replyTo?: {
    email: string;
    subject: string;
  };
}

export function ComposeEmail({ open, onOpenChange, replyTo }: ComposeEmailProps) {
  const [to, setTo] = useState(replyTo?.email || '');
  const [subject, setSubject] = useState(replyTo?.subject ? `Re: ${replyTo.subject}` : '');
  const [content, setContent] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (!to) {
      toast({
        title: "Missing recipient",
        description: "Please specify at least one recipient",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the email via an API
    toast({
      title: "Email sent",
      description: "Your message has been sent successfully",
    });
    
    // Reset form and close
    setTo('');
    setSubject('');
    setContent('');
    onOpenChange(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsMinimized(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={`
          p-0 gap-0 ${isMinimized ? 'h-20 overflow-hidden' : ''} 
          ${isFullscreen ? 'max-w-screen w-screen h-screen rounded-none' : 'max-w-2xl'}
        `}
      >
        <DialogHeader className="px-4 py-2 border-b flex-row flex justify-between items-center">
          <DialogTitle className="text-base">New Message</DialogTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8">
              <Minus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        {!isMinimized && (
          <>
            <div className="p-4 space-y-4">
              <div>
                <Input 
                  type="email" 
                  placeholder="To" 
                  value={to} 
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div>
                <Input 
                  placeholder="Subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <Textarea 
                placeholder="Write your message here..." 
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            <DialogFooter className="px-4 py-2 border-t">
              <div className="flex justify-between w-full items-center">
                <div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Paperclip className="h-3.5 w-3.5" />
                    Attach
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground">
                    Press <kbd className="shortcut-key">⌘</kbd><kbd className="shortcut-key">Enter</kbd> to send
                  </div>
                  <Button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
