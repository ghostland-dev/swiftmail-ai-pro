
import React from 'react';
import { Paperclip } from 'lucide-react';

interface EmailAttachmentsProps {
  hasAttachments: boolean;
}

export function EmailAttachments({ hasAttachments }: EmailAttachmentsProps) {
  if (!hasAttachments) return null;
  
  return (
    <div className="mt-6 p-3 border rounded-md">
      <div className="font-medium flex items-center mb-2">
        <Paperclip className="h-4 w-4 mr-2" />
        Attachments
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="p-3 border rounded flex items-center gap-2 bg-muted/30">
          <div className="bg-blue-100 text-blue-700 p-2 rounded">
            <FileIcon />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">Project-Timeline.pdf</div>
            <div className="text-xs text-muted-foreground">2.4 MB</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
