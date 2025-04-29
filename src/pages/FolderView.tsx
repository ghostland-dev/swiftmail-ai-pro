
import React, { useState } from 'react';
import { EmailHeader } from '@/components/EmailHeader';
import { EmailSidebar } from '@/components/EmailSidebar';
import { EmailList, Email } from '@/components/EmailList';
import { EmailDetailWrapper } from '@/components/EmailDetailWrapper';
import { FolderHeader } from '@/components/folder/FolderHeader';
import { EmptyFolder } from '@/components/folder/EmptyFolder';
import { FolderIcon } from '@/components/folder/FolderIcons';
import { useParams } from 'react-router-dom';
import { ComposeEmail } from '@/components/ComposeEmail';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useFolderEmails } from '@/hooks/use-folder-emails';
import { useEmailNavigation } from '@/components/folder/EmailNavigation';

const FolderView = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showComposeEmail, setShowComposeEmail] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const { folderName } = useParams<{ folderName: string }>();
  
  const folderEmails = useFolderEmails(folderName);
  const { handleNextEmail, handlePrevEmail } = useEmailNavigation({
    emails: folderEmails,
    selectedEmail,
    setSelectedEmail
  });
  
  const displayName = folderName ? 
    folderName.charAt(0).toUpperCase() + folderName.slice(1) : 
    'Inbox';
  
  const folderIcon = <FolderIcon folderName={folderName} />;
  
  useKeyboardShortcuts({
    onCompose: () => setShowComposeEmail(true),
    onToggleShortcutsDialog: () => setShowKeyboardShortcuts(prev => !prev),
    onNextEmail: handleNextEmail,
    onPrevEmail: handlePrevEmail,
  });

  return (
    <div className="h-screen flex flex-col bg-background">
      <EmailHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <EmailSidebar onCompose={() => setShowComposeEmail(true)} />
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/3 border-r overflow-hidden flex flex-col">
            <FolderHeader 
              icon={folderIcon}
              displayName={displayName}
              emailCount={folderEmails.length}
            />
            
            {folderEmails.length > 0 ? (
              <EmailList 
                emails={folderEmails} 
                onSelectEmail={setSelectedEmail} 
                selectedEmail={selectedEmail}
              />
            ) : (
              <EmptyFolder 
                icon={folderIcon}
                displayName={displayName}
              />
            )}
          </div>
          
          <div className="flex-1 overflow-hidden">
            <EmailDetailWrapper 
              email={selectedEmail}
              onPrevEmail={handlePrevEmail}
              onNextEmail={handleNextEmail}
            />
          </div>
        </div>
      </div>
      
      <ComposeEmail 
        open={showComposeEmail} 
        onOpenChange={setShowComposeEmail} 
        replyTo={selectedEmail ? {
          email: selectedEmail.from.email,
          subject: selectedEmail.subject
        } : undefined}
      />
      
      <KeyboardShortcuts 
        open={showKeyboardShortcuts} 
        onOpenChange={setShowKeyboardShortcuts} 
      />
    </div>
  );
};

export default FolderView;
