
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Inbox, 
  Star, 
  Clock, 
  Send, 
  Archive, 
  Trash2, 
  Settings,
  PlusCircle,
  Users,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon: Icon, label, count, active, onClick }: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start mb-1 font-normal',
        active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
      )}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className={cn(
          'ml-auto text-xs font-medium rounded-full px-2 py-0.5',
          active ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'bg-sidebar-accent/50 text-sidebar-foreground'
        )}>
          {count}
        </span>
      )}
    </Button>
  );
};

export function EmailSidebar() {
  return (
    <div className="h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
      <div className="p-4">
        <Button className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Compose
        </Button>
      </div>
      
      <div className="px-3 py-2 flex-1 overflow-auto">
        <SidebarItem icon={Inbox} label="Inbox" count={12} active />
        <SidebarItem icon={Star} label="Starred" count={3} />
        <SidebarItem icon={Clock} label="Snoozed" />
        <SidebarItem icon={Send} label="Sent" />
        <SidebarItem icon={FileText} label="Drafts" count={2} />
        <SidebarItem icon={Archive} label="Archive" />
        <SidebarItem icon={Trash2} label="Trash" />
        
        <div className="mt-6 mb-2 px-2 text-xs font-medium text-sidebar-foreground/70">
          LABELS
        </div>
        
        <SidebarItem icon={Users} label="Team" />
        <SidebarItem icon={FileText} label="Documents" />
      </div>
      
      <div className="mt-auto p-3 border-t border-sidebar-border">
        <SidebarItem icon={Settings} label="Settings" />
      </div>
    </div>
  );
}
