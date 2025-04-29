
import React from 'react';
import { Email } from '@/components/EmailList';

interface EmailNavigationProps {
  emails: Email[];
  selectedEmail: Email | null;
  setSelectedEmail: (email: Email | null) => void;
}

export function useEmailNavigation({ emails, selectedEmail, setSelectedEmail }: EmailNavigationProps) {
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

  return {
    handleNextEmail,
    handlePrevEmail
  };
}
