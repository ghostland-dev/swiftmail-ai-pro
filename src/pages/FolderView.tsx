
import React, { useState } from 'react';
import { EmailHeader } from '@/components/EmailHeader';
import { EmailSidebar } from '@/components/EmailSidebar';
import { EmailList, Email } from '@/components/EmailList';
import { EmailDetailWrapper } from '@/components/EmailDetailWrapper';
import { mockEmails } from '@/lib/data';
import { 
  RefreshCcw,
  MoreHorizontal, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useParams } from 'react-router-dom';
import { ComposeEmail } from '@/components/ComposeEmail';
import { KeyboardShortcuts } from '@/components/KeyboardShortcuts';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

const FolderView = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showComposeEmail, setShowComposeEmail] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const { folderName } = useParams<{ folderName: string }>();
  
  // In a real app, this would fetch emails for the specific folder
  const folderEmails = React.useMemo(() => {
    // Simple logic to simulate different folders
    switch(folderName?.toLowerCase()) {
      case 'starred':
        return mockEmails.filter(email => email.starred);
      case 'sent':
        return mockEmails.slice(0, 3); // Just a few emails for sent
      case 'drafts':
        return mockEmails.slice(0, 2); // Just a couple for drafts
      case 'archive':
        return mockEmails.slice(3, 5); // A few for archive
      case 'trash':
        return mockEmails.slice(1, 3); // A couple for trash
      case 'team':
        return mockEmails.filter(email => email.labels?.includes('Team'));
      case 'documents':
        return mockEmails.filter(email => email.hasAttachments);
      default:
        return mockEmails; // Default to inbox
    }
  }, [folderName]);
  
  const handleNextEmail = () => {
    if (selectedEmail) {
      const currentIndex = folderEmails.findIndex(email => email.id === selectedEmail.id);
      if (currentIndex < folderEmails.length - 1) {
        setSelectedEmail(folderEmails[currentIndex + 1]);
      }
    } else if (folderEmails.length > 0) {
      setSelectedEmail(folderEmails[0]);
    }
  };
  
  const handlePrevEmail = () => {
    if (selectedEmail) {
      const currentIndex = folderEmails.findIndex(email => email.id === selectedEmail.id);
      if (currentIndex > 0) {
        setSelectedEmail(folderEmails[currentIndex - 1]);
      }
    }
  };
  
  // Format the folder name for display
  const displayName = folderName ? 
    folderName.charAt(0).toUpperCase() + folderName.slice(1) : 
    'Inbox';
  
  // Icons for different folders
  const getFolderIcon = () => {
    switch(folderName?.toLowerCase()) {
      case 'starred': return <Tag className="h-5 w-5" />;
      case 'archive': return <Archive className="h-5 w-5" />;
      case 'trash': return <Trash2 className="h-5 w-5" />;
      case 'drafts': return <FileIcon className="h-5 w-5" />;
      case 'sent': return <SentIcon className="h-5 w-5" />;
      default: return <FolderIcon className="h-5 w-5" />;
    }
  };
  
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
            <div className="p-2 border-b flex items-center justify-between">
              <div className="flex items-center">
                {getFolderIcon()}
                <h2 className="font-medium ml-2">
                  {displayName} ({folderEmails.length})
                </h2>
              </div>
              
              <div className="flex items-center">
                <Button variant="ghost" size="icon">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                    <DropdownMenuItem>Sort by date</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Folder settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {folderEmails.length > 0 ? (
              <EmailList 
                emails={folderEmails} 
                onSelectEmail={setSelectedEmail} 
                selectedEmail={selectedEmail}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center">
                <div>
                  {getFolderIcon()}
                  <h3 className="font-medium mt-4 mb-1">No emails in {displayName}</h3>
                  <p className="text-sm">This folder is empty</p>
                </div>
              </div>
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

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  );
}

function SentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M22 2L11 13"></path>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );
}

export default FolderView;
