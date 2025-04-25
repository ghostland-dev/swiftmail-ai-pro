
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface KeyboardShortcutsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcuts({ open, onOpenChange }: KeyboardShortcutsProps) {
  const shortcutSections = [
    {
      title: 'Navigation',
      shortcuts: [
        { keys: ['j'], description: 'Next email' },
        { keys: ['k'], description: 'Previous email' },
        { keys: ['o', 'Enter'], description: 'Open email' },
        { keys: ['u'], description: 'Back to inbox' },
      ],
    },
    {
      title: 'Actions',
      shortcuts: [
        { keys: ['e'], description: 'Archive' },
        { keys: ['#'], description: 'Delete' },
        { keys: ['r'], description: 'Reply' },
        { keys: ['a'], description: 'Reply all' },
        { keys: ['f'], description: 'Forward' },
        { keys: ['s'], description: 'Star/unstar' },
      ],
    },
    {
      title: 'Composition',
      shortcuts: [
        { keys: ['c'], description: 'Compose new email' },
        { keys: ['⌘', 'Enter'], description: 'Send email' },
        { keys: ['Esc'], description: 'Discard draft' },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Keyboard shortcuts</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shortcutSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-medium mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.shortcuts.map((shortcut) => (
                  <div key={shortcut.description} className="flex justify-between items-center">
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key) => (
                        <kbd key={key} className="shortcut-key">{key}</kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
