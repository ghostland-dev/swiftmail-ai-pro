
import React, { useState } from 'react';
import { EmailHeader } from './EmailHeader';
import { EmailSidebar } from './EmailSidebar';
import { EmailList, Email } from './EmailList';
import { EmailDetail } from './EmailDetail';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { ComposeEmail } from './ComposeEmail';
import { mockEmails } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';
import { Keyboard } from 'lucide-react';

export function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showComposeEmail, setShowComposeEmail] = useState(false);
  const { toast } = useToast();
  
  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process shortcuts when not in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch(e.key) {
        case 'j': // Next email
          if (selectedEmail) {
            const currentIndex = mockEmails.findIndex(email => email.id === selectedEmail.id);
            if (currentIndex < mockEmails.length - 1) {
              setSelectedEmail(mockEmails[currentIndex + 1]);
            }
          } else {
            setSelectedEmail(mockEmails[0]);
          }
          break;
        case 'k': // Previous email
          if (selectedEmail) {
            const currentIndex = mockEmails.findIndex(email => email.id === selectedEmail.id);
            if (currentIndex > 0) {
              setSelectedEmail(mockEmails[currentIndex - 1]);
            }
          }
          break;
        case 'c': // Compose new email
          setShowComposeEmail(true);
          break;
        case 'r': // Reply to email
          if (selectedEmail) {
            setShowComposeEmail(true);
          }
          break;
        case '?': // Show keyboard shortcuts
          setShowKeyboardShortcuts(true);
          break;
        case 'Escape': // Close keyboard shortcuts
          setShowKeyboardShortcuts(false);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEmail, toast]);
  
  return (
    <div className="h-screen flex flex-col bg-background">
      <EmailHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <EmailSidebar onCompose={() => setShowComposeEmail(true)} />
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/3 border-r overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-2 border-b">
              <h2 className="font-medium">Inbox (12)</h2>
              <div className="text-xs text-muted-foreground flex items-center">
                <Keyboard className="h-3.5 w-3.5 mr-1" />
                Press <kbd className="shortcut-key mx-1">?</kbd> for shortcuts
              </div>
            </div>
            
            <EmailList 
              emails={mockEmails} 
              onSelectEmail={setSelectedEmail} 
              selectedEmail={selectedEmail}
            />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <EmailDetail 
              email={selectedEmail} 
              onReply={() => setShowComposeEmail(true)}
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
