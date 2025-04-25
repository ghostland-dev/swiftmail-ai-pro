
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Keyboard } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface KeyboardShortcutsCardProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function KeyboardShortcutsCard({ enabled, onToggle }: KeyboardShortcutsCardProps) {
  const shortcuts = [
    { key: 'j / k', description: 'Navigate to next/previous email' },
    { key: 'o or Enter', description: 'Open selected email' },
    { key: 'c', description: 'Compose new email' },
    { key: 'r', description: 'Reply to email' },
    { key: 'a', description: 'Reply all' },
    { key: 'f', description: 'Forward email' },
    { key: '/', description: 'Search' },
    { key: '?', description: 'Show keyboard shortcuts' },
    { key: 'Esc', description: 'Close current view' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyboard Shortcuts</CardTitle>
        <CardDescription>Customize keyboard shortcuts for faster email management</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Keyboard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Enable Keyboard Shortcuts</p>
              <p className="text-sm text-muted-foreground">
                Use keyboard shortcuts for common actions
              </p>
            </div>
          </div>
          <Switch checked={enabled} onCheckedChange={onToggle} />
        </div>

        {enabled && (
          <>
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Key</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shortcuts.map((shortcut) => (
                    <TableRow key={shortcut.key}>
                      <TableCell>
                        {shortcut.key.split(' / ').map((k, i) => (
                          <React.Fragment key={k}>
                            {i > 0 && <span className="mx-1 text-muted-foreground">/</span>}
                            <kbd className="shortcut-key">{k}</kbd>
                          </React.Fragment>
                        ))}
                      </TableCell>
                      <TableCell>{shortcut.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
