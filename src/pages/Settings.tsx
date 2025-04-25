
import React, { useEffect, useState } from 'react';
import { EmailHeader } from '@/components/EmailHeader';
import { EmailSidebar } from '@/components/EmailSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileCard } from '@/components/settings/ProfileCard';
import { AppearanceCard } from '@/components/settings/AppearanceCard';
import { SecurityCard } from '@/components/settings/SecurityCard';
import { KeyboardShortcutsCard } from '@/components/settings/KeyboardShortcutsCard';

const Settings = () => {
  const [shortcutsEnabled, setShortcutsEnabled] = useState(() => {
    const saved = localStorage.getItem('swiftmail-shortcuts-enabled');
    return saved !== null ? saved === 'true' : true;
  });
  
  // Save shortcuts preference
  useEffect(() => {
    localStorage.setItem('swiftmail-shortcuts-enabled', shortcutsEnabled.toString());
  }, [shortcutsEnabled]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <EmailHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <EmailSidebar />
        
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground mb-6">Manage your account preferences and app settings</p>
            
            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-6">
                <ProfileCard />
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6">
                <AppearanceCard />
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <SecurityCard />
              </TabsContent>
              
              <TabsContent value="shortcuts" className="space-y-6">
                <KeyboardShortcutsCard 
                  enabled={shortcutsEnabled} 
                  onToggle={setShortcutsEnabled} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
