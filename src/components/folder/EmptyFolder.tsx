
import React from 'react';

interface EmptyFolderProps {
  icon: React.ReactNode;
  displayName: string;
}

export function EmptyFolder({ icon, displayName }: EmptyFolderProps) {
  return (
    <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 text-center">
      <div>
        {icon}
        <h3 className="font-medium mt-4 mb-1">No emails in {displayName}</h3>
        <p className="text-sm">This folder is empty</p>
      </div>
    </div>
  );
}
