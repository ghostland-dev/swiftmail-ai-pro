
import React from 'react';
import { Email } from './EmailList';
import { EmailHeader } from './email/EmailHeader';
import { EmailContent } from './email/EmailContent';
import { EmailAttachments } from './email/EmailAttachments';
import { EmailActions } from './email/EmailActions';

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

  return (
    <div className="h-full flex flex-col animate-fade-in transition-all duration-300">
      <EmailHeader email={email} />
      
      <div className="flex-1 overflow-auto p-6 bg-card/50 dark:bg-card/10 transition-all duration-300">
        <EmailContent from={email.from} />
        <EmailAttachments hasAttachments={email.hasAttachments || false} />
      </div>
      
      <EmailActions onReply={onReply} />
    </div>
  );
}
