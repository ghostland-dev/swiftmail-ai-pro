
import React from 'react';
import { Button } from '@/components/ui/button';
import { Reply, ReplyAll, Forward } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

interface EmailActionsProps {
  onReply?: () => void;
}

export function EmailActions({ onReply }: EmailActionsProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <div className="p-4 border-t flex justify-between bg-card/90 backdrop-blur-sm transition-colors duration-300">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 transition-all duration-200 hover:scale-105"
          onClick={onReply}
        >
          <Reply className="h-3.5 w-3.5" />
          Reply
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 transition-all duration-200 hover:scale-105"
        >
          <ReplyAll className="h-3.5 w-3.5" />
          Reply All
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 transition-all duration-200 hover:scale-105"
        >
          <Forward className="h-3.5 w-3.5" />
          Forward
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground self-center">
        Press <kbd className={`shortcut-key ${isDarkMode ? 'bg-secondary/80 text-secondary-foreground/90' : ''}`}>r</kbd> to reply
      </div>
    </div>
  );
}
