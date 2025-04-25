
import React, { useState } from 'react';
import { EmailDetail } from './EmailDetail';
import { FocusMode } from './FocusMode';
import { Email } from './EmailList';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { ComposeEmail } from './ComposeEmail';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Archive, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EmailDetailWrapperProps {
  email: Email | null;
  onPrevEmail?: () => void;
  onNextEmail?: () => void;
  onArchive?: (emailId: string) => void;
  onDelete?: (emailId: string) => void;
}

export function EmailDetailWrapper({
  email,
  onPrevEmail,
  onNextEmail,
  onArchive,
  onDelete,
}: EmailDetailWrapperProps) {
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showComposeEmail, setShowComposeEmail] = useState(false);
  const { toast } = useToast();
  
  const handleArchive = () => {
    if (email) {
      onArchive?.(email.id);
      toast({ title: "Email archived" });
    }
  };
  
  const handleDelete = () => {
    if (email) {
      onDelete?.(email.id);
      toast({ title: "Email deleted" });
    }
  };
  
  useKeyboardShortcuts({
    onReply: () => email && setShowComposeEmail(true),
    onForward: () => email && setShowComposeEmail(true),
    onToggleShortcutsDialog: () => setShowKeyboardShortcuts(prev => !prev),
    onNextEmail,
    onPrevEmail,
    onArchive: handleArchive,
    onDelete: handleDelete,
    enabled: !!email,
  });
  
  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center">
        <div>
          <h3 className="font-medium mb-1">No email selected</h3>
          <p className="text-sm">Select an email from the list to view its contents</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <FocusMode className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-2 border-b bg-background sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onPrevEmail} disabled={!onPrevEmail}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous email</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onNextEmail} disabled={!onNextEmail}>
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next email</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleArchive}>
              <Archive className="h-4 w-4" />
              <span className="sr-only">Archive</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
        
        <EmailDetail 
          email={email} 
          onReply={() => setShowComposeEmail(true)} 
        />
      </FocusMode>
      
      <KeyboardShortcuts 
        open={showKeyboardShortcuts} 
        onOpenChange={setShowKeyboardShortcuts} 
      />
      
      <ComposeEmail 
        open={showComposeEmail} 
        onOpenChange={setShowComposeEmail} 
        replyTo={email ? {
          email: email.from.email,
          subject: email.subject
        } : undefined}
      />
    </>
  );
}
