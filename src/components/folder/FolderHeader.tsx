
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface FolderHeaderProps {
  icon: React.ReactNode;
  displayName: string;
  emailCount: number;
}

export function FolderHeader({ icon, displayName, emailCount }: FolderHeaderProps) {
  return (
    <div className="p-2 border-b flex items-center justify-between">
      <div className="flex items-center">
        {icon}
        <h2 className="font-medium ml-2">
          {displayName} ({emailCount})
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
  );
}
