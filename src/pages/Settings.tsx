import React from 'react';
import { EmailHeader } from '@/components/EmailHeader';
import { EmailSidebar } from '@/components/EmailSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { User, Mail, Bell, Shield, Clock, Keyboard, Palette } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Settings = () => {
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
              <TabsList className="grid grid-cols-7 lg:w-3/4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
                <TabsTrigger value="labels">Labels</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <span className="text-2xl">JD</span>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm" className="mb-1">
                          Upload new photo
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          JPG, GIF or PNG. 1MB max.
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input id="name" defaultValue="Jane Doe" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="display-name" className="text-sm font-medium">
                          Display Name
                        </label>
                        <Input id="display-name" defaultValue="Jane" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input id="email" defaultValue="jane.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="signature" className="text-sm font-medium">
                          Email Signature
                        </label>
                        <Input id="signature" defaultValue="Best regards, Jane" />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>Manage your subscription and billing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SwiftMail Pro</p>
                        <p className="text-sm text-muted-foreground">
                          $9.99/month · Renews on Sep 15, 2023
                        </p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Linked Accounts</CardTitle>
                    <CardDescription>Connect your other email accounts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Mail className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Gmail</p>
                          <p className="text-sm text-muted-foreground">
                            jane.work@gmail.com
                          </p>
                        </div>
                      </div>
                      <Badge>Connected</Badge>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Add another account</p>
                          <p className="text-sm text-muted-foreground">
                            Connect Gmail, Outlook, or other IMAP accounts
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>Customize the look and feel</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Palette className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-muted-foreground">
                            Switch between light and dark themes
                          </p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Palette className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Accent Color</p>
                          <p className="text-sm text-muted-foreground">
                            Change the primary color of the interface
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer ring-2 ring-offset-2 ring-purple-500"></div>
                        <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer"></div>
                        <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer"></div>
                        <div className="w-6 h-6 rounded-full bg-red-500 cursor-pointer"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Control how you're notified about new emails</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Desktop Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Show notifications on your desktop
                          </p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Priority Only</p>
                          <p className="text-sm text-muted-foreground">
                            Only notify for important emails
                          </p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Quiet Hours</p>
                          <p className="text-sm text-muted-foreground">
                            Disable notifications during specific hours
                          </p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Other tabs would be implemented similarly */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="shortcuts" className="space-y-6">
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
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
