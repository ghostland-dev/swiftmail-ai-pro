
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Reply, 
  ReplyAll, 
  Forward, 
  MoreHorizontal, 
  Trash2, 
  Archive, 
  Star,
  Paperclip
} from 'lucide-react';
import { Email } from './EmailList';
import { cn } from '@/lib/utils';

interface EmailDetailProps {
  email: Email | null;
  onReply?: () => void;
}

export function EmailDetail({ email, onReply }: EmailDetailProps) {
  if (!email) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select an email to view
      </div>
    );
  }

  // Generate a random initial for the avatar
  const initial = email.from.name.charAt(0).toUpperCase();
  
  // Generate a random content (In a real app, this would come from the email)
  const content = `
    <p>Hi there,</p>
    <p>Thanks for your email. I wanted to follow up on our conversation about the project timeline.</p>
    <p>We're making good progress and should be able to meet our deadlines as discussed. Here are some key updates:</p>
    <ul>
      <li>Frontend development is 80% complete</li>
      <li>Backend API integration is on track</li>
      <li>QA testing will begin next week</li>
    </ul>
    <p>Let me know if you have any questions or concerns.</p>
    <p>Best regards,<br>${email.from.name}</p>
  `;

  const handleReply = () => {
    if (onReply) {
      onReply();
    }
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{email.subject}</h2>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Star className={cn(
                "h-4 w-4",
                email.starred && "text-yellow-500 fill-yellow-500"
              )} />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-purple-100 text-purple-800 font-semibold">
            <span>{initial}</span>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{email.from.name}</div>
                <div className="text-sm text-muted-foreground">{email.from.email}</div>
              </div>
              <div className="text-sm text-muted-foreground">{email.time}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        
        {email.hasAttachments && (
          <div className="mt-6 p-3 border rounded-md">
            <div className="font-medium flex items-center mb-2">
              <Paperclip className="h-4 w-4 mr-2" />
              Attachments
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-3 border rounded flex items-center gap-2 bg-muted/30">
                <div className="bg-blue-100 text-blue-700 p-2 rounded">
                  <FileIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">Project-Timeline.pdf</div>
                  <div className="text-xs text-muted-foreground">2.4 MB</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t flex justify-between">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleReply}
          >
            <Reply className="h-3.5 w-3.5" />
            Reply
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ReplyAll className="h-3.5 w-3.5" />
            Reply All
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Forward className="h-3.5 w-3.5" />
            Forward
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground self-center">
          Press <kbd className="shortcut-key">r</kbd> to reply
        </div>
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
