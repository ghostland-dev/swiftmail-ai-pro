
import { useMemo } from 'react';
import { Email } from '@/components/EmailList';
import { mockEmails } from '@/lib/data';

export function useFolderEmails(folderName?: string) {
  const folderEmails = useMemo(() => {
    switch(folderName?.toLowerCase()) {
      case 'starred':
        return mockEmails.filter(email => email.starred);
      case 'sent':
        return mockEmails.slice(0, 3);
      case 'drafts':
        return mockEmails.slice(0, 2);
      case 'archive':
        return mockEmails.slice(3, 5);
      case 'trash':
        return mockEmails.slice(1, 3);
      case 'team':
        return mockEmails.filter(email => email.labels?.includes('Team'));
      case 'documents':
        return mockEmails.filter(email => email.hasAttachments);
      default:
        return mockEmails;
    }
  }, [folderName]);
  
  return folderEmails;
}
