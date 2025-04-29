
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Archive, Trash2, Star, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Email } from '@/components/EmailList';

interface EmailHeaderProps {
  email: Email;
}

export function EmailHeader({ email }: EmailHeaderProps) {
  // Generate a random initial for the avatar
  const initial = email.from.name.charAt(0).toUpperCase();
  
  return (
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
  );
}
