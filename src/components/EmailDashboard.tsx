
import React, { useState } from 'react';
import { EmailHeader } from './EmailHeader';
import { EmailSidebar } from './EmailSidebar';
import { EmailList, Email } from './EmailList';
import { EmailDetailWrapper } from './EmailDetailWrapper';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { ComposeEmail } from './ComposeEmail';
import { mockEmails } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';
import { Keyboard } from 'lucide-react';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

export function EmailDashboard() {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showComposeEmail, setShowComposeEmail] = useState(false);
  const { toast } = useToast();
  
  const handleNextEmail = () => {
    if (selectedEmail) {
      const currentIndex = emails.findIndex(email => email.id === selectedEmail.id);
      if (currentIndex < emails.length - 1) {
        setSelectedEmail(emails[currentIndex + 1]);
      }
    } else if (emails.length > 0) {
      setSelectedEmail(emails[0]);
    }
  };
  
  const handlePrevEmail = () => {
    if (selectedEmail) {
      const currentIndex = emails.findIndex(email => email.id === selectedEmail.id);
      if (currentIndex > 0) {
        setSelectedEmail(emails[currentIndex - 1]);
      }
    }
  };
  
  const handleArchive = (emailId: string) => {
    // In a real app, this would call an API
    setEmails(emails.filter(email => email.id !== emailId));
    
    if (selectedEmail?.id === emailId) {
      handleNextEmail();
    }
  };
  
  const handleDelete = (emailId: string) => {
    // In a real app, this would call an API
    setEmails(emails.filter(email => email.id !== emailId));
    
    if (selectedEmail?.id === emailId) {
      handleNextEmail();
    }
  };
  
  useKeyboardShortcuts({
    onCompose: () => setShowComposeEmail(true),
    onToggleShortcutsDialog: () => setShowKeyboardShortcuts(prev => !prev),
    onNextEmail: handleNextEmail,
    onPrevEmail: handlePrevEmail,
    onOpenEmail: () => {/* already handled in EmailList */},
  });
  
  return (
    <div className="h-screen flex flex-col bg-background">
      <EmailHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <EmailSidebar onCompose={() => setShowComposeEmail(true)} />
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/3 border-r overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-2 border-b">
              <h2 className="font-medium">Inbox ({emails.length})</h2>
              <div className="text-xs text-muted-foreground flex items-center">
                <Keyboard className="h-3.5 w-3.5 mr-1" />
                Press <kbd className="shortcut-key mx-1">?</kbd> for shortcuts
              </div>
            </div>
            
            <EmailList 
              emails={emails} 
              onSelectEmail={setSelectedEmail} 
              selectedEmail={selectedEmail}
            />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <EmailDetailWrapper 
              email={selectedEmail}
              onPrevEmail={handlePrevEmail}
              onNextEmail={handleNextEmail}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
      
      <KeyboardShortcuts 
        open={showKeyboardShortcuts} 
        onOpenChange={setShowKeyboardShortcuts} 
      />
      
      <ComposeEmail 
        open={showComposeEmail} 
        onOpenChange={setShowComposeEmail} 
        replyTo={selectedEmail ? {
          email: selectedEmail.from.email,
          subject: selectedEmail.subject
        } : undefined}
      />
    </div>
  );
}
