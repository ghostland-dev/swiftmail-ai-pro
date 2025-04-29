
import React from 'react';
import { 
  Tag,
  Archive,
  Trash2,
  FileText,
} from 'lucide-react';

export function FolderIcon({ folderName }: { folderName?: string }) {
  switch(folderName?.toLowerCase()) {
    case 'starred': return <Tag className="h-5 w-5" />;
    case 'archive': return <Archive className="h-5 w-5" />;
    case 'trash': return <Trash2 className="h-5 w-5" />;
    case 'drafts': return <FileIcon className="h-5 w-5" />;
    case 'sent': return <SentIcon className="h-5 w-5" />;
    default: return <DefaultFolderIcon className="h-5 w-5" />;
  }
}

export function DefaultFolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}

export function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  );
}

export function SentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M22 2L11 13"></path>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );
}
