
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Mail, 
  BellRing, 
  User,
  Command,
  Keyboard
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function EmailHeader() {
  return (
    <header className="border-b p-2 flex items-center justify-between bg-background">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-purple-600 flex items-center">
          <Mail className="h-5 w-5 mr-2" />
          SwiftMail
        </h1>
        
        <Badge variant="outline" className="ml-2 hidden md:inline-flex">Pro</Badge>
      </div>
      
      <div className="relative flex-1 max-w-md mx-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input 
          type="search" 
          placeholder="Search emails..."
          className="pl-10 bg-muted/40"
        />
        <div className="absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
          <kbd className="shortcut-key">⌘</kbd>
          <kbd className="shortcut-key ml-1">K</kbd>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative">
          <Keyboard className="h-5 w-5" />
          <span className="sr-only">Keyboard shortcuts</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <BellRing className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />
          <span className="sr-only">Notifications</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">User account</span>
        </Button>
      </div>
    </header>
  );
}
