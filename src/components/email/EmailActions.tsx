
import React from 'react';
import { Button } from '@/components/ui/button';
import { Reply, ReplyAll, Forward } from 'lucide-react';

interface EmailActionsProps {
  onReply?: () => void;
}

export function EmailActions({ onReply }: EmailActionsProps) {
  return (
    <div className="p-4 border-t flex justify-between">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onReply}
        >
          <Reply className="h-3.5 w-3.5" />
          Reply
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ReplyAll className="h-3.5 w-3.5" />
          Reply All
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Forward className="h-3.5 w-3.5" />
          Forward
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground self-center">
        Press <kbd className="shortcut-key">r</kbd> to reply
      </div>
    </div>
  );
}
