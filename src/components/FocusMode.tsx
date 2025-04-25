
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Expand, Minimize } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FocusModeProps {
  children: React.ReactNode;
  className?: string;
}

export function FocusMode({ children, className }: FocusModeProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={cn(
      "relative transition-all duration-300 ease-in-out",
      isFocused ? "fixed inset-0 z-50 bg-background p-4 overflow-auto" : "",
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsFocused(prev => !prev)}
        className="absolute right-2 top-2 z-10"
      >
        {isFocused ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
        <span className="sr-only">
          {isFocused ? "Exit focus mode" : "Enter focus mode"}
        </span>
      </Button>
      {children}
    </div>
  );
}
