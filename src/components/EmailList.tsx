
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Star, Paperclip } from 'lucide-react';

export type Email = {
  id: string;
  from: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  starred: boolean;
  priority: boolean;
  hasAttachments: boolean;
  labels?: string[];
};

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  selectedEmail?: Email | null;
}

export function EmailList({ emails, onSelectEmail, selectedEmail }: EmailListProps) {
  return (
    <div className="h-full overflow-auto">
      {emails.map((email) => (
        <div 
          key={email.id}
          className={cn(
            'email-list-item p-4',
            email.read ? 'read' : 'unread',
            email.priority && 'priority',
            selectedEmail?.id === email.id && 'bg-secondary',
          )}
          onClick={() => onSelectEmail(email)}
        >
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-yellow-500">
              <Star 
                className={cn(
                  "h-5 w-5",
                  email.starred && "text-yellow-500 fill-yellow-500"
                )} 
              />
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <div className="font-semibold text-sm truncate">
                  {email.from.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {email.time}
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1 truncate">
                    {email.subject}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {email.preview}
                  </div>
                </div>
                
                <div className="flex items-center ml-2 gap-1 flex-shrink-0">
                  {email.hasAttachments && (
                    <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  
                  {email.labels && email.labels.map(label => (
                    <Badge 
                      key={label} 
                      variant="secondary" 
                      className="text-xs px-1.5"
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
