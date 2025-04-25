
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export function useKeyboardShortcuts({
  onCompose,
  onReply,
  onForward,
  onToggleShortcutsDialog,
  onNextEmail,
  onPrevEmail,
  onOpenEmail,
  onArchive,
  onDelete,
  enabled = true,
}: {
  onCompose?: () => void;
  onReply?: () => void;
  onForward?: () => void;
  onToggleShortcutsDialog?: () => void;
  onNextEmail?: () => void;
  onPrevEmail?: () => void;
  onOpenEmail?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  enabled?: boolean;
}) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shortcutsEnabled, setShortcutsEnabled] = useState(() => {
    const saved = localStorage.getItem('swiftmail-shortcuts-enabled');
    return saved !== null ? saved === 'true' : true;
  });

  // Combine the global setting with the component's enabled prop
  const areShortcutsActive = enabled && shortcutsEnabled;
  
  useEffect(() => {
    if (!areShortcutsActive) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip shortcuts if focus is in an input or textarea
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }
      
      switch(e.key) {
        case 'c':
          onCompose?.();
          break;
        case 'r':
          onReply?.();
          break;
        case 'f':
          onForward?.();
          break;
        case 'j':
          onNextEmail?.();
          break;
        case 'k':
          onPrevEmail?.();
          break;
        case 'o':
        case 'Enter':
          onOpenEmail?.();
          break;
        case 'e':
          onArchive?.();
          break;
        case '#':
          onDelete?.();
          break;
        case '/':
          navigate('/search');
          break;
        case '?':
          onToggleShortcutsDialog?.();
          break;
        case 'g':
          // Wait for next keystroke
          const onSecondKey = (e2: KeyboardEvent) => {
            if (e2.key === 'i') navigate('/');
            if (e2.key === 's') navigate('/settings');
            
            // Remove this event listener after handling the second key
            window.removeEventListener('keydown', onSecondKey);
          };
          window.addEventListener('keydown', onSecondKey);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    areShortcutsActive,
    onCompose,
    onReply,
    onForward,
    onToggleShortcutsDialog,
    onNextEmail,
    onPrevEmail,
    onOpenEmail,
    onArchive,
    onDelete,
    navigate,
  ]);
  
  return { shortcutsEnabled, setShortcutsEnabled };
}
